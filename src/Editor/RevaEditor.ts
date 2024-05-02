import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { MonacoLanguageClient } from 'monaco-languageclient';
import {
  registerRevaLanguage,
  REVA_LANGUAGE_EXTENSION,
  REVA_LANGUAGE_ID,
} from './definitions';
import {
  WebSocketMessageReader,
  WebSocketMessageWriter,
  toSocket,
} from 'vscode-ws-jsonrpc';
import {
  CloseAction,
  ErrorAction,
} from 'vscode-languageclient/lib/common/client';

registerRevaLanguage();

export class RevaEditor {
  editor: monaco.editor.IStandaloneCodeEditor;
  model: monaco.editor.ITextModel;
  languageClient: MonacoLanguageClient | null = null;

  constructor(element: HTMLElement) {
    // try {
    //   MonacoServices.get()
    // } catch (e: unknown) {
    //   // Install only if services are not yet available (exception will happen only then)
    //   MonacoServices.install()
    // }

    this.model = monaco.editor.createModel(
      '',
      REVA_LANGUAGE_ID,
      monaco.Uri.parse(
        `file:///rule-${Math.random()}.${REVA_LANGUAGE_EXTENSION}`
      )
    );

    this.editor = monaco.editor.create(element, {
      model: this.model,
      value: 'const',
      language: REVA_LANGUAGE_ID,
    });
  }

  startWebSocket(url: string) {
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
        this.languageClient = languageClient;

        resolve(languageClient);
      };

      webSocket.onerror = (error) => {
        reject(error);
      };
    });
  }

  async dispose() {
    this.editor.dispose();
    this.model?.dispose();
    await this.languageClient?.dispose();
  }
}
