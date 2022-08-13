"use strict";

import * as http from 'http';
import * as url from 'url';
import Controller from '../../Controller';
import NormalApiView from '../../../View/Api/NormalApiView';

class KeywordGetController extends Controller {
    public execute(parsedUrl: url.Url, _request: http.ServerRequest, response: http.ServerResponse, _postData: string): void {
        this.log.access.info("controller 'KeywordGetController' was called.");

        let querystring = require('querystring');
        let q = (parsedUrl.search === null || parsedUrl.search === undefined) ? undefined :  parsedUrl.search.substring(1);
        let page = querystring.parse(q).page;
        let limit = querystring.parse(q).limit;
        let keyword_id = querystring.parse(q).keyword_id;

        let model = this.modelFactory.get("KeywordModel");
        if(typeof keyword_id != "undefined") {
            model.setOption({ keyword_id: Number(keyword_id) });
        } else {
            model.setOption({ page: Number(page), limit: Number(limit) });
        }

        let view = new NormalApiView(response, "KeywordModel");
        view.setModels({ KeywordModel: model });

        model.addViewEvent(view);
        model.execute();
    }
}

export default KeywordGetController;

