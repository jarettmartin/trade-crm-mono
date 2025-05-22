import * as admin from 'firebase-admin';
import { join } from 'path';

const serviceAccountPath = process.env.FIREBASE_ADMIN_SDK_PATH;

if (!serviceAccountPath) {
  throw new Error('Missing FIREBASE_ADMIN_SDK_PATH environment variable');
}

admin.initializeApp({
  credential: admin.credential.cert(
    require(join(process.cwd(), serviceAccountPath))
  ),
});

export { admin };
