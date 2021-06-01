class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }

    greet() {
        const greetingMessage = this.createChatBotMessage('Hi, friend.')
        this.updateChatbotState(greetingMessage)
    }

    bot1() {
        var date = getDate()
        const bot1Action = this.createChatBotMessage(date)
        this.updateChatbotState(date)
    }

    updateChatbotState(message) {

        this.setState(prevState => ({
            ...prevState, messages: [...prevState.messages, message]
        }))
    }
}

export default ActionProvider
