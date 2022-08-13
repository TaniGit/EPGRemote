"use strict";

import * as http from 'http';
import * as url from 'url';
import Controller from '../../Controller';
import NormalApiView from '../../../View/Api/NormalApiView';

class RecordedListController extends Controller {
    public execute(parsedUrl: url.Url, _request: http.ServerRequest, response: http.ServerResponse, _postData: string): void {
        this.log.access.info("controller 'RecordedListController' was called.");

        let querystring = require('querystring');
        let q = (parsedUrl.search === null || parsedUrl.search === undefined) ? undefined :  parsedUrl.search.substring(1);
        let search = querystring.parse(q).search;
        let autorec = querystring.parse(q).keyword_id;
        let category_id = querystring.parse(q).category_id;
        let channel_id = querystring.parse(q).channel_id;
        let page = querystring.parse(q).page;
        let limit = querystring.parse(q).limit;

        let model = this.modelFactory.get("RecordedListModel");
        model.setOption({
            search: search,
            autorec: Number(autorec),
            category_id: Number(category_id),
            channel_id: Number(channel_id),
            page: Number(page),
            limit: Number(limit)
        });

        let view = new NormalApiView(response, "RecordedListModel");
        view.setModels({ RecordedListModel: model });

        model.addViewEvent(view);
        model.execute();
    }
}

export default RecordedListController;

