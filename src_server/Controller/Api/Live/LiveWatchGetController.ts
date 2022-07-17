"use strict";

import * as http from 'http';
import * as url from 'url';
import Controller from '../../Controller';
import NormalApiView from '../../../View/Api/NormalApiView';

class LiveWatchGetController extends Controller {
    public execute(parsedUrl: url.Url, _request: http.ServerRequest, response: http.ServerResponse, _postData: string): void {
        this.log.access.info("controller 'LiveWatchGetController' was called.");

	var querystring = require('querystring');
        let model = this.modelFactory.get("LiveWatchStreamInfoModel");
        let streamId = querystring.parse(parsedUrl.query).stream;
        let channel = querystring.parse(parsedUrl.query).channel;
        let sid = querystring.parse(parsedUrl.query).sid;
        let tuner = querystring.parse(parsedUrl.query).tuner;
        let video = querystring.parse(parsedUrl.query).video;

        if(!this.check(streamId)) { model.setOption({ streamId: Number(streamId) }); }
        if(!this.check(channel) && !this.check(sid) && !this.check(tuner) && !this.check(video)) {
            model.setOption({
                channel: channel,
                sid: sid,
                tuner: Number(tuner),
                video: Number(video)
            });
        }

        let view = new NormalApiView(response, "LiveWatchStreamInfoModel");
        view.setModels({ LiveWatchStreamInfoModel: model });

        model.addViewEvent(view);
        model.execute();
    }

    private check(value: string): boolean {
        return typeof value == "undefined";
    }
}

export default LiveWatchGetController;

