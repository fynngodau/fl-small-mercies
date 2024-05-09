import {GameState, StoryletPhases} from "./game_state";

interface StateMatcher {
    match(state: GameState): boolean;
    describe(): string;
}

class AndPredicate implements StateMatcher {
    private readonly left: StateMatcher;
    private readonly right: StateMatcher;

    constructor(left: StateMatcher, right: StateMatcher) {
        this.left = left;
        this.right = right;
    }

    describe(): string {
        return `And(${this.left.describe()}, ${this.right.describe()})`;
    }

    match(state: GameState): boolean {
        return this.left.match(state) && this.right.match(state);
    }
}

class OrPredicate implements StateMatcher {
    private readonly predicates: StateMatcher[];

    constructor(...predicates: StateMatcher[]) {
        this.predicates = predicates;
    }

    describe(): string {
        return `Or(${this.predicates.map(p => p.describe()).join(', ')}})`;
    }

    match(state: GameState): boolean {
        return this.predicates.map(p => p.match(state)).some(b => b);
    }
}

class IsInSetting implements StateMatcher {
    private readonly expectedSettingId: number;

    constructor(settingId: number) {
        this.expectedSettingId = settingId;
    }

    describe(): string {
        return `InSetting(${this.expectedSettingId})`;
    }

    match(state: GameState): boolean {
        return state.location.setting.settingId === this.expectedSettingId;
    }
}

class IsInArea implements StateMatcher {
    private readonly expectedAreaId: number;

    constructor(settingId: number) {
        this.expectedAreaId = settingId;
    }

    describe(): string {
        return `InArea(${this.expectedAreaId})`;
    }

    match(state: GameState): boolean {
        return state.location.area.areaId === this.expectedAreaId;
    }
}

class IsInStorylet implements StateMatcher {
    private readonly expectedStoryletId: number;

    constructor(storyletId: number) {
        this.expectedStoryletId = storyletId;
    }

    describe(): string {
        return `InStorylet(${this.expectedStoryletId})`;
    }

    match(state: GameState): boolean {
        if ('id' in state.currentStorylet) {
            return state.currentStorylet.id == this.expectedStoryletId;
        }
        return false;
    }
}

class NoStorylet implements StateMatcher {

    constructor() {
    }

    describe(): string {
        return `NoStorylet`;
    }

    match(state: GameState): boolean {
        return state.storyletPhase == StoryletPhases.Unknown || state.storyletPhase == StoryletPhases.Available;
    }
}

class IsInAnyStorylet implements StateMatcher {

    constructor() {
    }

    describe(): string {
        return `InAnyStorylet()`;
    }

    match(state: GameState): boolean {
        return state.storyletPhase == StoryletPhases.In;
    }
}

export {IsInArea, IsInSetting, IsInStorylet, NoStorylet, IsInAnyStorylet, AndPredicate, OrPredicate, StateMatcher};
