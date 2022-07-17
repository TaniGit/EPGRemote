"use strict";

import * as http from 'http';
import * as url from 'url';
import Controller from '../../Controller';
import NormalApiView from '../../../View/Api/NormalApiView';

class RecordedListController extends Controller {
    public execute(parsedUrl: url.Url, _request: http.ServerRequest, response: http.ServerResponse, _postData: string): void {
        this.log.access.info("controller 'RecordedListController' was called.");

	var querystring = require('querystring');
        let search = querystring.parse(parsedUrl.query).search;
        let autorec = querystring.parse(parsedUrl.query).keyword_id;
        let category_id = querystring.parse(parsedUrl.query).category_id;
        let channel_id = querystring.parse(parsedUrl.query).channel_id;
        let page = querystring.parse(parsedUrl.query).page;
        let limit = querystring.parse(parsedUrl.query).limit;

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

