import {IMutationAware, IStateAware} from "./base";
import {SettingsObject} from "../settings";
import {GameStateController, GameState} from "../game_state";
import {IsInArea, IsInSetting, IsInStorylet, IsInAnyStorylet, NoStorylet, AndPredicate, OrPredicate, StateMatcher} from "../matchers";
import {getSingletonByClassName} from "../utils";

class TopQuality {
    readonly name: string;
    readonly category: string;
    readonly iconImage: string;
    readonly title: string;
    readonly cap?: number;
    readonly forceShow: boolean;
    readonly predicate: StateMatcher;
    
    constructor(fullName: string, category: string, icon: string, forceShow: boolean, predicate: StateMatcher, cap?: number, displayName?: string) {
        this.name = fullName;
        this.category = category;
        this.iconImage = icon;
        this.cap = cap;
        this.forceShow = forceShow;
        this.predicate = predicate;

        this.title = typeof displayName != "undefined" ? displayName : fullName;
    }
}

const UNDERCLAY_PREDICATE = new OrPredicate(new IsInStorylet(343156), new OrPredicate(new IsInStorylet(343154), new IsInStorylet(343176)));
const DOUBT_STREET_PREDICATE = new AndPredicate(new IsInArea(47), new OrPredicate(new IsInAnyStorylet(), new NoStorylet()));
const NAGA_ADVERTISING_PREDICATE = new AndPredicate(new IsInArea(111202), new OrPredicate(new IsInAnyStorylet(), new NoStorylet()));
const BOARD_ROOM_PREDICATE = new OrPredicate(
    new IsInStorylet(329558), // Into the Boardroom
    new IsInStorylet(329421), // Explore adding to the Board
    new IsInStorylet(327095), // Convene a Board Meeting of the Great Hellbound Railway
);
const FORGOTTEN_QUARTER_EXPEDITION_SUPPLY_PREDICATE = new OrPredicate(
    new IsInStorylet(108662), // Prepare for an Expedition
    new IsInStorylet(109228) // Begin an Expedition redirect ("Be prepared")
);
const WAKEFUL_EYE_PREDICATE = new OrPredicate(
    new IsInStorylet(285304), // Offering Tribute to the Court of the Wakeful Eye
);
const CABINET_NOIR_FRONT_ROOM = new IsInStorylet(334177); // Work in your Cabinet Noir
const CABINET_NOIR_BACK_ROOM = new IsInStorylet(334201); // Your Cabinet Noir: The Back Room

const SUNKEN_EMBASSY = new OrPredicate(
    new IsInStorylet(342081), // Spelunking in the Sunken Embassy
    new IsInStorylet(342082), // Above, Below
    new IsInStorylet(342095), // The Sunken Spoils
);

const QUALTS = [
    new TopQuality("Ealing Gardens Commercial Development", "Story", "coin", true, new OrPredicate(new IsInStorylet(336171), new IsInStorylet(322179)), 3),
    new TopQuality("Stone Confessions", "Progress", "cavelake", true, UNDERCLAY_PREDICATE, 600),
    new TopQuality("Convincing Falsehoods", "Progress", "arm", true, UNDERCLAY_PREDICATE, 600),
    new TopQuality("Hour before the Deadline", "Progress", "clock", false, DOUBT_STREET_PREDICATE),
    new TopQuality("Meritorious Copy", "Curiosity", "newspaper", true, DOUBT_STREET_PREDICATE, 104),
    new TopQuality("Salacious Copy", "Curiosity", "newspaper", true, DOUBT_STREET_PREDICATE, 104),
    new TopQuality("Outlandish Copy", "Curiosity", "newspaper", true, DOUBT_STREET_PREDICATE, 104),
    //new TopQuality("Prolific Advertiser", "Story", "storyextraordinary", false, NAGA_ADVERTISING_PREDICATE),
    new TopQuality("In Corporate Debt", "Story", "coingold", true, BOARD_ROOM_PREDICATE),
    new TopQuality("Crate of Expedition Supplies", "Goods", "toolbox", true, FORGOTTEN_QUARTER_EXPEDITION_SUPPLY_PREDICATE, 100, "Supplies"),
    new TopQuality("Tribute", "Story", "tigerstripes", true, WAKEFUL_EYE_PREDICATE, 260),
    new TopQuality("Disappearing...", "Progress", "secret", false, CABINET_NOIR_FRONT_ROOM, 10),
    new TopQuality("Cover Identity: Elaboration", "Story", "mask", true, CABINET_NOIR_BACK_ROOM, 10, "Elaboration"),
    new TopQuality("Cover Identity: Nuance", "Story", "ridiculoushat", true, CABINET_NOIR_BACK_ROOM, 6, "Nuance"),
    new TopQuality("Cover Identity: Witnesses", "Story", "whispered_secret", true, CABINET_NOIR_BACK_ROOM, 6, "Witnesses"),
    new TopQuality("Cover Identity: Credentials", "Story", "envelope", true, CABINET_NOIR_BACK_ROOM, 6, "Credentials"),
    new TopQuality("Cover Identity: Backstory", "Story", "maskpurple", true, CABINET_NOIR_BACK_ROOM, undefined, "Backstory"),
    new TopQuality("Fragments of Infernal Affairs", "Progress", "paperstack", true, SUNKEN_EMBASSY, 600),
]

export class TopQualities implements IMutationAware, IStateAware {
    private showTopQualities = true;
    private qualityValues: Map<string, number> = new Map();
    private state?: GameState;

    constructor() {
        for (const quality of QUALTS) {
            this.qualityValues.set(quality.name, 0);
        }
    }

    applySettings(settings: SettingsObject): void {
        this.showTopQualities = settings.top_bar_qualities as boolean;
    }

    linkState(controller: GameStateController): void {
        controller.onCharacterDataLoaded((g) => {
            for (const quality of QUALTS) {
                const userQuality = g.getQuality(quality.category, quality.name);
                if (userQuality) {
                    this.qualityValues.set(quality.name, userQuality.level);
                } else {
                    this.qualityValues.set(quality.name, 0);
                }
            }
        });

        controller.onQualityChanged((state, quality, _previous, current) => {
            if (this.qualityValues.has(quality.name)) {
                this.qualityValues.set(quality.name, current);
            }
        });

        controller.onLocationChanged((state, _location) => {
            if (this.showTopQualities) {
                this.state = state;
                //this.checkVisibilityPredicates(state);
                if ("id" in state.currentStorylet) {
                    console.log(state.currentStorylet.id);
                } else {
                    console.log("No storylet");
                }
            }
        });

        controller.onStoryletChanged((state) => {
            if (this.showTopQualities) {
                this.state = state;
                //this.checkVisibilityPredicates(state);
                if ("id" in state.currentStorylet) {
                    console.log(state.currentStorylet.id);
                } else {
                    console.log("No storylet");
                }
                const main = document.getElementById("main");
                if (main) {
                    this.onNodeAdded(main);
                }
            }
        });
    }
    
    /*private checkVisibilityPredicates(state: GameState) {
    	const qualities = document.getElementById("top-qualities");
    	if (qualities) {
			if (QUALTS[1].predicate.match(state)) {
				qualities.style.cssText = "opacity: 100%";
			} else {
				qualities.style.cssText = "opacity: 50%";
			}
    	}
    }*/

    private createQuality(quality: TopQuality, value: number): HTMLElement {

        const newDisplay = this.createQualityDisplay(quality.title, quality.iconImage + "small", value, quality.cap);
        if (value == 0 && !quality.forceShow) {
            newDisplay.style.cssText = "display: none";
        }

        return newDisplay;
    }

    private createQualityDisplay(title: string, icon: string, value: number, cap?: number): HTMLElement {
        const li = document.createElement("li");
        li.classList.add("js-item", "item", "sidebar-quality", "tracked-quality");
        li.style.cssText = "text-align: left";
        li.dataset.qualityName = title;

        const div = document.createElement("div");
        div.classList.add("js-icon", "icon", "js-tt", "icon--circular");

        const div3 = document.createElement("div");
        div3.classList.add("item__desc");

        const div4 = document.createElement("div");
        div4.setAttribute("tabindex", "0");
        div4.setAttribute("role", "button");
        div4.setAttribute("aria-label", title);
        div4.style.cssText = "outline: 0px; outline-offset: 0px; cursor: default;";

        const span = document.createElement("span");
        span.classList.add("js-item-name", "item__name");
        span.textContent = title;

        const span3 = document.createElement("span");
        span3.classList.add("quality-item__description");
        
        const img = document.createElement("img");
        img.classList.add("cursor-default");
        img.setAttribute("alt", `${title}`);
        img.setAttribute("src", `//images.fallenlondon.com/icons/${icon}.png`);
        img.setAttribute("aria-label", `${title}`);

        li.appendChild(div);
        li.appendChild(div3);
        div.appendChild(div4);
        div3.appendChild(span);
        div3.appendChild(span3);
        div4.appendChild(img);

        if (!cap) {
            span3.textContent = ` ${value}`;
        } else {
            span3.textContent = ` ${value} / ${cap}`;
            const div5 = document.createElement("div");
            div5.classList.add("progress-bar");

            const span4 = document.createElement("span");
            span4.classList.add("progress-bar__stripe", "progress-bar__stripe--has-transition");
            const percentage = (value / cap) * 100;
            span4.style.cssText = `width: ${percentage}%;`;

            div3.appendChild(div5);

            div5.appendChild(span4);
        }

        return li;
    }

    checkEligibility(node: HTMLElement): boolean {
        if (!this.showTopQualities) {
            return false;
        }

        if (node.classList.contains("media--root")) {
            return true;
        }

        if (node.getElementsByClassName("media--root").length > 0) {
            return true;
        }
        
        if (node.classList.contains("cards")) {
            return true;
        }

        if (node.getElementsByClassName("cards").length > 0) {
            return true;
        }

        if (node.getElementsByClassName("storylet").length > 0) {
            return true;
        }

        return false;
    }

    onNodeAdded(node: HTMLElement): void {
        const main = document.getElementById("main");
        if (!main) return;
        const border = main.firstChild;
        if (!border) return;

        let qualitiesPanel = document.getElementById("top-qualities");
        // Destroy old qualities display and create a current one.
        if (qualitiesPanel) {
            const parent = qualitiesPanel.parentElement;
            if (parent) {
                parent.removeChild(qualitiesPanel);
            }
        }
        
        /*const favoursHeader = document.createElement("p");
        favoursHeader.classList.add("heading", "heading--4");
        favoursHeader.textContent = "This station";
        fragment.appendChild(favoursHeader);*/

        qualitiesPanel = document.createElement("ul");
        qualitiesPanel.classList.add("items", "items--list");
        qualitiesPanel.style.cssText = "margin-top: 15px; width: 100%;";

        // Create eligible qualities
        for (const quality of QUALTS) {
            if (this.state && quality.predicate.match(this.state)) {
                const qualityDisplay = this.createQuality(quality, this.qualityValues.get(quality.name) || 0);
                qualitiesPanel.appendChild(qualityDisplay);
            }
        }
        
        if (qualitiesPanel.children.length) {
            // Insert inside media-root (storylet top text), if present, or after cards and fifth city storylets, if there are any
            const cards = getSingletonByClassName(main, "cards");
            const storyletBox = getSingletonByClassName(main, "media--root");
            const firstStorylet = getSingletonByClassName(main, "storylet");
            const fifthCityStorylets = getSingletonByClassName(main, "disclosure-wrapper");
            
            if (storyletBox) {
                const qualitiesContainer = document.createElement("div");
                qualitiesContainer.style.cssText= "width: 100%;";
                qualitiesContainer.setAttribute("id", "top-qualities");

                const divider = document.createElement("hr");
                divider.style.cssText = "margin-top: 7px; margin-bottom: 7px; border-bottom: 0px; border-top: 1px solid #bdb29e"; // 15px space total
                qualitiesContainer.appendChild(divider);
                qualitiesContainer.appendChild(qualitiesPanel);

                storyletBox.appendChild(qualitiesContainer);
            } else if (fifthCityStorylets) {
                qualitiesPanel.style.cssText = "margin-top: 15px;";
                qualitiesPanel.setAttribute("id", "top-qualities");
                border.insertBefore(qualitiesPanel, fifthCityStorylets.nextSibling);
            } else if (cards) {
                qualitiesPanel.style.cssText = "margin-top: 15px;";
                qualitiesPanel.setAttribute("id", "top-qualities");
                border.insertBefore(qualitiesPanel, cards.nextSibling);
            } else if (firstStorylet) {
                qualitiesPanel.style.cssText = "margin-top: 15px;";
                qualitiesPanel.setAttribute("id", "top-qualities");
                border.insertBefore(qualitiesPanel, border.firstChild);
            }
        }
    }

    onNodeRemoved(_node: HTMLElement): void {
        // Do nothing if DOM node is removed.
    }
}
