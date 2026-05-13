import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: null, // No auth for now as it's public
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const base44 = {
  entities: {
    ServiceRequest: {
      create: async (data: any) => {
        const path = 'service_requests';
        try {
          const docRef = await addDoc(collection(db, path), {
            ...data,
            status: 'pending',
            createdAt: serverTimestamp(),
          });
          return docRef.id;
        } catch (error) {
          handleFirestoreError(error, OperationType.CREATE, path);
        }
      }
    }
  },
  integrations: {
    Core: {
      SendEmail: async (params: { to: string; subject: string; body: string; from_name?: string }) => {
        console.log('Sending email (Mock):', params);
        return true;
      },
      InvokeLLM: async (params: { prompt: string }) => {
        const result = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: params.prompt,
        });
        return result.text;
      }
    }
  }
};
