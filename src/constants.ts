import {SettingsSchema} from "./settings.js";

const EXTENSION_NAME = "FL Small Mercies"
const EXTENSION_ID = "FL_SM";

const MSG_TYPE_SAVE_SETTINGS = `${EXTENSION_ID}_saveSettings`;
const MSG_TYPE_CURRENT_SETTINGS = `${EXTENSION_ID}_currentSettings`;

const SETTINGS_SCHEMA: SettingsSchema = [
    {
        title: "UI Fixes",
        settings: {
            "fix_journal_navigation":
            {
                description: "Fix color and alignment of the navigation buttons in Journal.",
                default: true
            },
            "discrete_scrollbars":
            {
                description: "Remove scrollbars from discrete sidebar qualities.",
                default: true
            },
            "scrip_icon":
            {
                description: "Add Hinterlands Scrip Icon to a sidebar indicator.",
                default: true
            },
            "sort_city_mysteries":
            {
                description: "Sort 'Mystery of the ... City' qualities.",
                default: true,
            },
            "sort_discordance_seals":
            {
                description: "Sort ███████████ █████.",
                default: true,
            },
            "sort_neathbow_boxes":
            {
                description: "Sort Neathbow boxes in your inventory.",
                default: true,
            },
        }
    },
    {
        title: "UI Improvements",
        settings: {
            "add_thousands_separator": {
                description: "Add comma after thousands in the currency indicators.",
                default: true,
            },
            "remove_mask_banner": {
                description: "Remove 'Mask of the Rose' banner.",
                default: false,
            },
            "remove_sidebar_snippets": {
                description: "Remove 'Snippets' from the right sidebar.",
                default: true,
            },
            "add_profile_link": {
                description: "Add button that points to your profile.",
                default: true,
            },
            "display_favour_tracker": {
                description: "Display Favours in the right sidebar.",
                default: true,
            },
            "auto_scroll_back": {
                description: "Auto-scroll to the storylet after choosing branch.",
                default: true
            },
            "quick_share_button": {
                description: "Replace usual 'Share snippet' button with a quicker alternative.",
                default: true,
            },
        }
    },
    {
        title: "Whimsical stuff",
        settings: {
            "remove_plan_buttons": {
                description: "Remove 'Plans' button & related buttonlets",
                default: true
            },
            "ship_saver": {
                description: "Disable storylet that lets you sell your Ship.",
                default: true
            },
            "ascetic_mode": {
                description: "Remove both location banner and candles.",
                default: true,
            },
        }
    },
]


export { EXTENSION_NAME, EXTENSION_ID, MSG_TYPE_SAVE_SETTINGS, MSG_TYPE_CURRENT_SETTINGS, SETTINGS_SCHEMA };