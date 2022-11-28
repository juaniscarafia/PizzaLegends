class ReplacementMenu {
    constructor({ replacements, onComplete }) {
        this.replacements = replacements;
        this.onComplete = onComplete;
    }

    decide(replacement) {
        this.menuSubmit(this.replacement[0]);
    }

    menuSubmit(replacement) {
        this.keyBoardMenu?.end();
        this.onComplete(replacement);
    }

    showMenu(container) {
        this.keyBoardMenu = new KeyBoardMenu();
        this.keyBoardMenu.init(container);
        this.keyBoardMenu.setOptions(this.replacements.map(c => {
            return {
                label: c.name,
                description: c.description,
                handler: () => {
                    this.menuSubmit(c);
                }
            }
        }));
    }

    init(container) {
        if (this.replacements[0].isPlayerControlled) {
            this.showMenu(container);    
        } else {
            this.decide();
        }
    }
}