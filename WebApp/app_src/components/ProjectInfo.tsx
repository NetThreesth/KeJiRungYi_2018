import * as React from "react";

import "./ProjectInfo.scss";

export class ProjectInfo extends React.PureComponent {

    render() {
        return <div id="projectInfo">
            <div id="showIcon"
                onClick={this.showContent.bind(this)}
                className="infoIcon"
                style={{ color: 'white' }}>
                <i className="fas fa-info-circle"></i>
            </div>
            <div id="hideIcon"
                onClick={this.hideContent.bind(this)}
                className="infoIcon"
                style={{ display: 'none' }}>
                <i className="fas fa-times"></i>
            </div>
            <div className="container"
                style={{ display: 'none' }}>
                <div className="content">
                    <h3>
                        關於<br />
                        社群織衍計畫3sth.net
                    </h3>
                    <br />
                    2006年小說《三體》的問世，讓這一古老的天文物理難題再度來到世人面前，三體問題所引發的思辨，亦可轉而探討當代文明的運作模式：不同於先古人們對於一體世界的詮釋(自然界)、文藝復興以降之二體世界觀(人與物、主體與客體)，當代社會漸漸形成以數據為基礎，自然、人類、科技三體交互作用而構築的有機網絡性社會。<br />
                    <br />
                    科技的飛速進展下，物理真實與虛擬真實因數據之產製與利用相互交融疊加，而數據也由物與人的衍生物，逐漸轉變為具有主體與能動性的存在，自然界與人類社會之相互關係至此加入了新的變數，未來將面臨更多渾沌未知。<br />
                    <br />
                    本計劃以當代三體共構之文化脈絡為討論主軸，以藻類(自然)、使用者(人類)與人工智慧(科技)為符碼，探討三者交互作用如何交織出文化織體，以及此間的運作方式：科技如何涉入並改變原先的雙體關係？新的三體關係的之於當代社會的意義為何？數據做為具有主體與能動性的存在，與人類主體性之交互關係又該如何定義？<br />
                    <br />
                    <br />
                    展覽時間：2018/10/16-10/28<br />
                    展出地點：國立臺灣美術館 205展間<br /><br />
                    <a target="_blank" href="https://aigaerithm.3sth.net/">了解更多</a>

                </div>
            </div>
        </div>;
    };



    private showContent() {
        $('#projectInfo .container').fadeIn();
        $('#showIcon').hide();
        $('#hideIcon').show();
    };
    private hideContent() {
        $('#projectInfo .container').fadeOut();
        $('#showIcon').show();
        $('#hideIcon').hide();
    };
};