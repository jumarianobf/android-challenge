import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent registra o App como o componente raiz da aplicação.
// Isso garante que o ambiente seja configurado corretamente, seja no Expo Go ou em uma build nativa.
registerRootComponent(App);
