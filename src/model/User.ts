import knex from "../knex";
import { Model, snakeCaseMappers, ModelOptions } from "objection";

import { hasDate, hasEmbeddedJson } from "../util/db";
import CoreProtectUser from "./CoreProtectUser";

@hasDate("time")
@hasEmbeddedJson("roles")
export default class User extends Model {
    static columnNameMappers = snakeCaseMappers();
    static tableName = "users";
    static idColumn = "id";

    id!: number;
    time!: Date;
    coreprotectUid!: number;
    roles!: string[];

    coreProtectUser!: CoreProtectUser;

    static relationMappings = {
        coreProtectUser: {
            relation: Model.BelongsToOneRelation,
            modelClass: `${__dirname}/CoreProtectUser`,
            join: {
                from: "co_user.rowid",
                to: "users.coreprotect_uid",
            },
        },
    };
}

User.knex(knex);
