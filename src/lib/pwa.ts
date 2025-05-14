export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const { registerSW } = await import('virtual:pwa-register');
      
      registerSW({
        onRegistered(r) {
          console.info('Service worker registrado com sucesso');
        },
        onRegisterError(error) {
          console.error('Erro ao registrar service worker:', error);
        },
        immediate: true,
        onNeedRefresh() {
          console.info('Nova versão disponível!');
        },
      });
    } catch (error) {
      console.error('Erro ao carregar service worker:', error);
    }
  }
};
