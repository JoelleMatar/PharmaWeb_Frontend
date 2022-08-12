class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase();
  
      if (lowerCaseMessage.includes("Hello")) {
        this.actionProvider.greet();
      }
  
      if (lowerCaseMessage.includes("products")) {
        this.actionProvider.handleJavascriptList();
      }
    }
  }
  
  export default MessageParser;
  