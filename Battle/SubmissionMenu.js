class SubmissionMenu {
    constructor({ caster, enemy, onComplete }) {
        this.caster = caster;
        this.enemy = enemy;
        this.onComplete = onComplete;
    }

    getPages() {
        const backOption = {
            label: "Go Back",
            description: "Return to previous page",
            handler: () => {
                this.keyBoardMenu.setOptions(this.getPages().root);
            }
        };

        return {
            root: [
                {
                    label: "Attack",
                    description: "Choose an attack",
                    handler: () => {
                        //Do something when chosen...
                        this.keyBoardMenu.setOptions(this.getPages().attacks);
                    }
                },
                {
                    label: "Items",
                    description: "Choose an item",
                    //disabled: true,
                    handler: () => {
                        //Go to items page...
                        this.keyBoardMenu.setOptions(this.getPages().items);
                    }
                },
                {
                    label: "Swap",
                    description: "Choose to another pizza",
                    handler: () => {
                        //See pizza options
                        this.keyBoardMenu.setOptions(this.getPages().swap);
                    }
                }
            ],
            attacks: [
                ...this.caster.actions.map(key => {
                    const action = Actions[key];
                    return {
                        label: action.name,
                        description: action.description,
                        handler: () => {
                            this.menuSubmit(action);
                        }
                    }
                }),
                backOption
            ],
            items: [
                //Items will go here...
                backOption
            ],
            swap: [
                //Items will go here...
                backOption
            ]
        }
    }

    menuSubmit(action, instanceId=null) {
        this.keyBoardMenu?.end();
        
        this.onComplete({
            action,
            target: action.targetType === "friendly" ? this.caster : this.enemy
        });
    }

    decide() {
        //TODO: Enemies should randomly decide what to do...
        this.menuSubmit(Actions[this.caster.actions[0]])
    }

    showMenu(container) {
        this.keyBoardMenu = new KeyBoardMenu();
        this.keyBoardMenu.init(container);
        this.keyBoardMenu.setOptions(this.getPages().root);
    }

    init(container) {
        if (this.caster.isPlayerControlled) {
            //Show some UI
            this.showMenu(container);
        }
        else {
            this.decide();
        }
    }
}