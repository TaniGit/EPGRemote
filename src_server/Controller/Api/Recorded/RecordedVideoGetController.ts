"use strict";

import * as http from 'http';
import * as url from 'url';
import Controller from '../../Controller';
import NormalApiView from '../../../View/Api/NormalApiView';

class RecordedVideoGetController extends Controller {
    public execute(parsedUrl: url.Url, _request: http.ServerRequest, response: http.ServerResponse, _postData: string): void {
        this.log.access.info("controller 'RecordedVideoGetController' was called.");

	var querystring = require('querystring');
        let rec_id = querystring.parse(parsedUrl.query).rec_id;
        let ios = querystring.parse(parsedUrl.query).ios;
        let android = querystring.parse(parsedUrl.query).android;
        let windows = querystring.parse(parsedUrl.query).windows;

        let model = this.modelFactory.get("RecordedVideoPathModel");
        model.setOption({
            rec_id: Number(rec_id),
            ios: Number(ios),
            android: Number(android),
            windows: Number(windows)
        });

        let view = new NormalApiView(response, "RecordedVideoPathModel");
        view.setModels({ RecordedVideoPathModel: model });

        model.addViewEvent(view);
        model.execute();
    }
}

export default RecordedVideoGetController;

