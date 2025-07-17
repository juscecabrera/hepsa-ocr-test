import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import axios from 'axios';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'https://ocr-test.vercel.app/api/callback';
const SCRIPT_URL = process.env.NEXT_PUBLIC_SCRIPT_URL;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Código de autorización no proporcionado' }, { status: 400 });
  }

  const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  // Enviar los datos al script de Google Apps Script
  const folderId = searchParams.get('folderId') || '';
  const spreadsheetId = searchParams.get('spreadsheetId') || '';

  try {
    const response = await axios.post(SCRIPT_URL, {
      folderId,
      spreadsheetId,
    }, {
      headers: { 'Content-Type': 'application/json' },
    });

    return NextResponse.redirect('/?status=' + encodeURIComponent(response.data.message));
  } catch (error) {
    return NextResponse.redirect('/?status=' + encodeURIComponent('Error al procesar: ' + error.message));
  }
}