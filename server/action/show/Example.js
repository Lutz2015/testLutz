/***************************************************************************
 *
 * Copyright (c) 2018 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/

/**
 * @file Example.js
 * @extend bun.guan
 * vue应用 demo
 */

class Action_Show_Example extends bun.class["guan"] {
    constructor() {
        super();
        this.a = 1;
    }
    async execute(ctx) {
        await ctx.render("example", {
            message: "Bunjs is ready!!",
            state: JSON.stringify({})
        });
    }
}

module.exports = Action_Show_Example;
