const commandPattern = /[a-zA-Z]+|\d+/g;

export default class CommandMatcher {

    checkInput(command)
    {
        let cmdParam = command.match(commandPattern);

        return cmdParam;
    }
}