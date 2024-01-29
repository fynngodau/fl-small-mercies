import {JournalUiFixer} from "./journal_ui";
import {ThousandSeparatorFixer} from "./thousands_separator";
import {AutoScrollFixer} from "./auto_scroll";
import {DiscreteScrollbarsFixer} from "./discrete_progressbars";
import {ScripIconFixer} from "./scrip_icon";
import {ShipSaverFixer} from "./ship_saver";
import {RightSidebarFixer} from "./right_sidebar";
import {PlanButtonsFixer} from "./plan_remover";
import {ThingSortFixer} from "./things_sorter";
import {ProfileLinkFixer} from "./profile_link";
import {QuickShareFixer} from "./quick_share";
import {AsceticModeFixer} from "./ascetic_mode";
import {FavourTrackerFixer} from "./favour_tracker";
import {SocialEmptyReqsFixer} from "./empty_requirements";
import {AfterFallYearFixer} from "./af_year";
import {KhanateOracleFixer} from "./khanate_oracle";
import {TopExitButtonsFixer} from "./top_exit_buttons";
import {LocationQualitiesFixer} from "./location_qualities";
import {MoreCurrencyDisplaysFixer} from "./currency_displays";
import {TwoStepConfirmationsFixer} from "./two_step_confirmations";
import {SingleItemIconFixer} from "./single_item_icon";
import {ShopTransactionFixer} from "./shop_transactions";
import {ShopPricesFixer} from "./shop_prices";
import {AnotherTimeFixer} from "./another_time";
import {PersistentPremiumFixer} from "./persistent_premium";
import {SpaceShortcutFixer} from "./space_shortcuts";
import {CustomSnippetsFixer} from "./custom_snippets";
import {DiscordanceChecksFixer} from "./discordance_checks";

export default [
    AutoScrollFixer,
    JournalUiFixer,
    ThousandSeparatorFixer,
    DiscreteScrollbarsFixer,
    ScripIconFixer,
    ShipSaverFixer,
    RightSidebarFixer,
    PlanButtonsFixer,
    ProfileLinkFixer,
    ThingSortFixer,
    QuickShareFixer,
    AsceticModeFixer,
    FavourTrackerFixer,
    SocialEmptyReqsFixer,
    AfterFallYearFixer,
    KhanateOracleFixer,
    TopExitButtonsFixer,
    LocationQualitiesFixer,
    MoreCurrencyDisplaysFixer,
    TwoStepConfirmationsFixer,
    SingleItemIconFixer,
    ShopTransactionFixer,
    ShopPricesFixer,
    AnotherTimeFixer,
    PersistentPremiumFixer,
    // FIXME: Removed till better times are at hand and FBG are less trigger-happy.
    // SpaceShortcutFixer,
    CustomSnippetsFixer,
    DiscordanceChecksFixer,
];
