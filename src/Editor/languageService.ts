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

export const REVA_LANGUAGE_ID2 = 'reva';

export const registerRevaLanguage2 = () => {
  monaco.languages.register({
    id: REVA_LANGUAGE_ID2,
  });
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
        name: `${REVA_LANGUAGE_ID2} Language Client`,
        clientOptions: {
          documentSelector: [REVA_LANGUAGE_ID2],
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
