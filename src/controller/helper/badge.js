import Badge from "../../models/badge.model.js";
import ModelHelper from "./base/model.js";

class BadgeHelper extends ModelHelper {
    static get Instance() {
        if (!BadgeHelper.instance) {
            BadgeHelper.instance = new BadgeHelper(Badge, 'Badge');
        }
        return BadgeHelper.instance;
    }
}

export default BadgeHelper;