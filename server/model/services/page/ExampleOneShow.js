class Model_Services_Page_ExampleOneShow extends bun.class["guan"] {
    constructor() {
        super();
    }
    execute(bsCommon) {
        let data = new Model_Services_Data_ApiData().getData(bsCommon);
        return {
            pageone: data
        };
    }
}

module.exports = Model_Services_Page_ExampleOneShow;
