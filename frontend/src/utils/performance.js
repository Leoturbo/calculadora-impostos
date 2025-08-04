// Monitoramento de performance básico
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      pageLoad: null,
      apiCalls: [],
      errors: []
    };
    
    this.init();
  }
  
  init() {
    // Monitorar carregamento da página
    window.addEventListener('load', () => {
      this.metrics.pageLoad = performance.now();
      this.log('Page loaded', { loadTime: this.metrics.pageLoad });
    });
    
    // Monitorar erros globais
    window.addEventListener('error', (event) => {
      this.metrics.errors.push({
        timestamp: new Date().toISOString(),
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      });
      
      this.log('Global error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });
    
    // Monitorar erros de promise não tratadas
    window.addEventListener('unhandledrejection', (event) => {
      this.metrics.errors.push({
        timestamp: new Date().toISOString(),
        type: 'UnhandledPromiseRejection',
        reason: event.reason
      });
      
      this.log('Unhandled promise rejection', { reason: event.reason });
    });
  }
  
  // Monitorar chamadas API
  trackApiCall(url, options, startTime) {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    this.metrics.apiCalls.push({
      timestamp: new Date().toISOString(),
      url,
      options,
      duration,
      success: true
    });
    
    this.log('API call completed', {
      url,
      duration: `${duration}ms`,
      method: options?.method || 'GET'
    });
  }
  
  trackApiError(url, options, error, startTime) {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    this.metrics.apiCalls.push({
      timestamp: new Date().toISOString(),
      url,
      options,
      duration,
      success: false,
      error: error.message
    });
    
    this.log('API call failed', {
      url,
      duration: `${duration}ms`,
      error: error.message
    });
  }
  
  // Log de eventos
  log(event, data = {}) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[MONITOR] ${event}:`, data);
    }
    
    // Em produção, você poderia enviar para um serviço de monitoramento
    if (process.env.NODE_ENV === 'production') {
      // Aqui você poderia enviar para um serviço como Sentry, LogRocket, etc.
      // this.sendToMonitoringService(event, data);
    }
  }
  
  // Obter métricas atuais
  getMetrics() {
    return {
      ...this.metrics,
      apiCallsCount: this.metrics.apiCalls.length,
      errorsCount: this.metrics.errors.length,
      averageApiTime: this.calculateAverageApiTime()
    };
  }
  
  // Calcular tempo médio de API
  calculateAverageApiTime() {
    const successfulCalls = this.metrics.apiCalls.filter(call => call.success);
    if (successfulCalls.length === 0) return 0;
    
    const totalTime = successfulCalls.reduce((sum, call) => sum + call.duration, 0);
    return totalTime / successfulCalls.length;
  }
  
  // Exportar métricas (útil para depuração)
  exportMetrics() {
    return JSON.stringify(this.metrics, null, 2);
  }
}

// Criar instância global
const performanceMonitor = new PerformanceMonitor();

export default performanceMonitor;