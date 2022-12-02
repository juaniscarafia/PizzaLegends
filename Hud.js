class Hud {
    constructor() {
        this.scoreBoards = [];
    }

    update() {
        this.scoreBoards.forEach( s=>{
            s.update(window.playerState.pizzas[s.id]);
        });
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("Hud");

        const { playerState } = window;
        playerState.lineup.forEach(key => {
            const pizza = playerState.pizzas[key];
            const scoreboard = new Combatant({
                id: key,
                ...Pizzas[pizza.pizzaId],
                ...pizza
            }, null);
            scoreboard.createElement();
            this.scoreBoards.push(scoreboard);
            this.element.appendChild(scoreboard.hudElement);
        });

        this.update();
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);

        document.addEventListener("PlayerStateUpdated", () => {
            this.update();
        });
    }
}