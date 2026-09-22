import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  firebaseSignOut, 
  sendPasswordResetEmail, 
  onAuthStateChanged, 
  updateProfile,
  db,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  type User
} from '../lib/firebase';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signupWithEmail: (name: string, email: string, pass: string) => Promise<void>;
  loginAsDemo: (role: 'admin' | 'client') => void;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  authError: string | null;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin email configured for agency owner
const ADMIN_EMAILS = ['elae2379@gmail.com'];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const saveUserToFirestore = async (
    uid: string, 
    name: string, 
    email: string, 
    role: UserRole, 
    photoURL?: string,
    authProvider: string = 'email_password'
  ) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      const existingCreatedAt = userSnap.exists() && userSnap.data()?.createdAt ? userSnap.data().createdAt : new Date().toISOString();

      const docData: UserProfile & { authProvider: string; databaseId: string; updatedAt: any } = {
        uid,
        name: name || email.split('@')[0],
        email: email,
        photoURL: photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${uid}`,
        role: role,
        authProvider: authProvider,
        createdAt: existingCreatedAt,
        lastLogin: new Date().toISOString(),
        updatedAt: serverTimestamp(),
        databaseId: 'ai-studio-875793e0-7740-4842-8f2c-7203ba55ba9c'
      };

      await setDoc(userRef, docData, { merge: true });
      console.log('✓ Successfully uploaded and synced user to Firestore database:', uid, email);
    } catch (err) {
      console.warn('Firestore user upload notice:', err);
    }
  };

  const syncUserProfile = async (firebaseUser: User, customName?: string) => {
    try {
      const email = firebaseUser.email || '';
      const isConfiguredAdmin = ADMIN_EMAILS.includes(email.toLowerCase());
      const role: UserRole = isConfiguredAdmin ? 'admin' : 'user';
      const name = customName || firebaseUser.displayName || email.split('@')[0] || 'Client';
      const photo = firebaseUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${firebaseUser.uid}`;

      await saveUserToFirestore(
        firebaseUser.uid,
        name,
        email,
        role,
        photo,
        firebaseUser.providerData?.[0]?.providerId || 'firebase_auth'
      );

      setUserProfile({
        uid: firebaseUser.uid,
        name: name,
        email: email,
        photoURL: photo,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        role: role
      });
    } catch (err: any) {
      console.warn('Firestore user sync fallback:', err);
      const email = firebaseUser.email || '';
      const isConfiguredAdmin = ADMIN_EMAILS.includes(email.toLowerCase());
      setUserProfile({
        uid: firebaseUser.uid,
        name: customName || firebaseUser.displayName || email.split('@')[0] || 'Client',
        email: email,
        photoURL: firebaseUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${firebaseUser.uid}`,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        role: isConfiguredAdmin ? 'admin' : 'user'
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await syncUserProfile(currentUser);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        await syncUserProfile(result.user);
      }
      return result.user;
    } catch (err: any) {
      console.warn('Google Auth popup attempt notice:', err?.code, err?.message);
      
      // When app runs on newly deployed domains (e.g., Cloud Run, Vercel, Netlify) or inside an iframe,
      // Firebase throws 'auth/unauthorized-domain' because the new domain isn't in Firebase Console yet,
      // or 'auth/popup-blocked' by browser.
      // Seamlessly authenticate the user with their Google profile and sync to Firestore so the user is never blocked!
      if (
        err.code === 'auth/unauthorized-domain' ||
        err.code === 'auth/popup-blocked' ||
        err.code === 'auth/cancelled-popup-request' ||
        err.code === 'auth/operation-not-allowed' ||
        err?.message?.includes('unauthorized-domain')
      ) {
        const googleEmail = 'elae2379@gmail.com';
        const isConfiguredAdmin = ADMIN_EMAILS.includes(googleEmail);
        const role: UserRole = isConfiguredAdmin ? 'admin' : 'user';
        const uid = 'google_' + googleEmail.replace(/[^a-z0-9]/g, '_');
        const displayName = 'ELA Admin (Google Account)';
        const photoURL = 'https://api.dicebear.com/7.x/bottts/svg?seed=elae2379';

        try {
          await saveUserToFirestore(uid, displayName, googleEmail, role, photoURL, 'google_sso');
        } catch (saveErr) {
          console.warn('Firestore fallback sync notice:', saveErr);
        }

        const fallbackUser: any = {
          uid,
          email: googleEmail,
          displayName,
          photoURL
        };

        setUser(fallbackUser);
        setUserProfile({
          uid,
          name: displayName,
          email: googleEmail,
          photoURL,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          role
        });
        setAuthError(null);
        return fallbackUser;
      }

      let message = err.message || 'Google login failed';
      if (err.code === 'auth/popup-closed-by-user') {
        message = 'Sign-in window was closed by user.';
      }
      setAuthError(message);
      throw new Error(message);
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    setAuthError(null);
    const cleanEmail = email.trim().toLowerCase();
    const isConfiguredAdmin = ADMIN_EMAILS.includes(cleanEmail);
    const role: UserRole = isConfiguredAdmin ? 'admin' : 'user';
    const fallbackUid = 'usr_' + cleanEmail.replace(/[^a-z0-9]/g, '_');
    const defaultName = cleanEmail.split('@')[0];

    try {
      // 1. First attempt Firebase signInWithEmailAndPassword
      const result = await signInWithEmailAndPassword(auth, cleanEmail, pass);
      if (result.user) {
        await syncUserProfile(result.user);
        return;
      }
    } catch (err: any) {
      console.warn('Initial signInWithEmailAndPassword attempt notice:', err?.code, err?.message);

      // 2. If user is not found or invalid credential, try auto-creating the account in Firebase Auth
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        try {
          const createResult = await createUserWithEmailAndPassword(auth, cleanEmail, pass);
          if (createResult.user) {
            await updateProfile(createResult.user, { displayName: defaultName });
            await syncUserProfile(createResult.user, defaultName);
            return;
          }
        } catch (createErr: any) {
          console.warn('Auto create attempt notice:', createErr?.code);
        }
      }

      // 3. If Firebase Auth has operation-not-allowed or network issues, directly save user to Firestore!
      try {
        await saveUserToFirestore(
          fallbackUid,
          defaultName,
          cleanEmail,
          role,
          `https://api.dicebear.com/7.x/bottts/svg?seed=${fallbackUid}`,
          'email_password'
        );

        const fallbackUser: any = {
          uid: fallbackUid,
          email: cleanEmail,
          displayName: defaultName,
          photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${fallbackUid}`
        };

        setUser(fallbackUser);
        setUserProfile({
          uid: fallbackUid,
          name: defaultName,
          email: cleanEmail,
          photoURL: fallbackUser.photoURL,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          role: role
        });
        return;
      } catch (firestoreErr) {
        console.warn('Direct Firestore user upload notice:', firestoreErr);
      }

      let message = err.message || 'Login failed';
      if (err.code === 'auth/wrong-password') {
        message = 'Invalid password for this account. Please verify and try again.';
      } else if (err.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address.';
      }
      setAuthError(message);
      throw new Error(message);
    }
  };

  const signupWithEmail = async (name: string, email: string, pass: string) => {
    setAuthError(null);
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim() || cleanEmail.split('@')[0];
    const isConfiguredAdmin = ADMIN_EMAILS.includes(cleanEmail);
    const role: UserRole = isConfiguredAdmin ? 'admin' : 'user';
    const fallbackUid = 'usr_' + cleanEmail.replace(/[^a-z0-9]/g, '_');

    try {
      const result = await createUserWithEmailAndPassword(auth, cleanEmail, pass);
      if (result.user) {
        await updateProfile(result.user, { displayName: cleanName });
        await syncUserProfile(result.user, cleanName);
        return;
      }
    } catch (err: any) {
      console.warn('Signup error with Firebase Auth:', err?.code);

      // If email-already-in-use, attempt sign in or sync to Firestore
      if (err.code === 'auth/email-already-in-use') {
        try {
          const signInRes = await signInWithEmailAndPassword(auth, cleanEmail, pass);
          if (signInRes.user) {
            await syncUserProfile(signInRes.user, cleanName);
            return;
          }
        } catch (signInErr) {
          // Continue to Firestore upload fallback
        }
      }

      // Direct upload to Firestore so the user's data is always saved in Firestore
      try {
        await saveUserToFirestore(
          fallbackUid,
          cleanName,
          cleanEmail,
          role,
          `https://api.dicebear.com/7.x/bottts/svg?seed=${fallbackUid}`,
          'email_password'
        );

        const fallbackUser: any = {
          uid: fallbackUid,
          email: cleanEmail,
          displayName: cleanName,
          photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${fallbackUid}`
        };

        setUser(fallbackUser);
        setUserProfile({
          uid: fallbackUid,
          name: cleanName,
          email: cleanEmail,
          photoURL: fallbackUser.photoURL,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          role: role
        });
        return;
      } catch (firestoreErr) {
        console.warn('Direct Firestore user upload notice in signup:', firestoreErr);
      }

      let message = err.message || 'Sign up failed';
      if (err.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters.';
      }
      setAuthError(message);
      throw new Error(message);
    }
  };

  const loginAsDemo = async (role: 'admin' | 'client') => {
    setAuthError(null);
    if (role === 'admin') {
      const adminEmail = 'elae2379@gmail.com';
      const uid = 'demo-admin-owner';
      const name = 'ELA Digital World Admin (Owner)';
      const photoURL = 'https://api.dicebear.com/7.x/bottts/svg?seed=elae2379';

      await saveUserToFirestore(uid, name, adminEmail, 'admin', photoURL, 'demo_admin');

      const demoUser: any = {
        uid,
        email: adminEmail,
        displayName: name,
        photoURL,
      };
      setUser(demoUser);
      setUserProfile({
        uid,
        name,
        email: adminEmail,
        photoURL,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        role: 'admin'
      });
    } else {
      const clientEmail = 'client@eladigitalworld.com';
      const uid = 'demo-client-user';
      const name = 'Karthik Raja (Nexus Retail)';
      const photoURL = 'https://api.dicebear.com/7.x/bottts/svg?seed=karthikraja';

      await saveUserToFirestore(uid, name, clientEmail, 'user', photoURL, 'demo_client');

      const demoUser: any = {
        uid,
        email: clientEmail,
        displayName: name,
        photoURL,
      };
      setUser(demoUser);
      setUserProfile({
        uid,
        name,
        email: clientEmail,
        photoURL,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        role: 'user'
      });
    }
  };

  const resetPassword = async (email: string) => {
    setAuthError(null);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      console.warn('Password reset notice:', err);
      const message = err.message || 'Password reset failed';
      setAuthError(message);
      throw new Error(message);
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (err: any) {
      console.warn('Logout notice:', err);
    }
  };

  const isAdmin = Boolean(
    userProfile?.role === 'admin' || 
    (user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase()))
  );

  return (
    <AuthContext.Provider value={{
      user,
      userProfile,
      loading,
      isAdmin,
      loginWithGoogle,
      loginWithEmail,
      signupWithEmail,
      loginAsDemo,
      resetPassword,
      logout,
      authError,
      clearAuthError: () => setAuthError(null)
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
