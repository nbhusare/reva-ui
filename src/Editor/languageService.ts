import { MonacoLanguageClient } from 'monaco-languageclient';
import {
  WebSocketMessageReader,
  WebSocketMessageWriter,
  toSocket,
} from 'vscode-ws-jsonrpc';
import {
  CloseAction,
  ErrorAction,
} from 'vscode-languageclient/lib/common/client';
import { monaco } from 'react-monaco-editor';
import { tokens } from './definitions/tokens';

export const REVA_LANGUAGE_ID = 'reva';

export const registerRevaLanguage = () => {
  monaco.languages.register({
    id: REVA_LANGUAGE_ID,
  });
  monaco.languages.setMonarchTokensProvider(REVA_LANGUAGE_ID, tokens);
};

export function startWebSocket(
  url: string,
  monacoLanguageClient: MonacoLanguageClient
) {
  return new Promise((resolve, reject) => {
    const webSocket = new WebSocket(url);

    webSocket.onopen = () => {
      const socket = toSocket(webSocket);
      const reader = new WebSocketMessageReader(socket);
      const writer = new WebSocketMessageWriter(socket);
      const languageClient = new MonacoLanguageClient({
        name: `${REVA_LANGUAGE_ID} Language Client`,
        clientOptions: {
          documentSelector: [REVA_LANGUAGE_ID],
          errorHandler: {
            error: () => ({ action: ErrorAction.Continue }),
            closed: () => ({ action: CloseAction.DoNotRestart }),
          },
        },
        connectionProvider: {
          get: () =>
            Promise.resolve({
              reader,
              writer,
            }),
        },
      });

      languageClient.start();
      monacoLanguageClient = languageClient;

      resolve(monacoLanguageClient);
    };

    webSocket.onerror = (error) => {
      reject(error);
    };
  });
}
