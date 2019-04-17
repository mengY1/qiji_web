<template>
  <div class="idnex" v-loading="loading">
    <el-container>
      <div class="seeQiji">
        <img v-show="shouCode" :src="baseUrl+'Slide out.png'" style="width:220px;height:220px;padding:26px;position:fixed;top:400px;right:50px;background:#FFFFFF;z-index:100;">
        <img @mouseenter="enter" @mouseleave="leave" :src="baseUrl+'hover.png'" style="width:44px;height:220px;position:fixed;top:400px;right:0px;cursor:pointer;z-index:100;">
      </div>
      <el-header>
        <div class="navBox">
          <div class="logo" @click="toIndex">
            <img style="width:68px;height:30px;margin-top:12px;cursor:pointer;" :src="url+'img/qiji-official-website/images/qijiLogo.png'">
          </div>
          <div class="tabBtn" v-if="showTab">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="首页" name="1" :class="[ activeName==1? 'is-active' : '' ]"></el-tab-pane>
              <el-tab-pane label="校园爆料" name="2" :class="[ activeName==2? 'is-active' : '' ]"></el-tab-pane>
              <el-tab-pane label="求职招聘" name="3" :class="[ activeName==3? 'is-active' : '' ]"></el-tab-pane>
              <el-tab-pane label="考研快讯" name="4" :class="[ activeName==4? 'is-active' : '' ]"></el-tab-pane>
              <el-tab-pane label="大学干货" name="5" :class="[ activeName==5? 'is-active' : '' ]"></el-tab-pane>
              <el-tab-pane label="学术活动" name="6" :class="[ activeName==6? 'is-active' : '' ]"></el-tab-pane>
              <el-tab-pane label="社团活动" name="7" :class="[ activeName==7? 'is-active' : '' ]"></el-tab-pane>
              <el-tab-pane label="竞赛活动" name="8" :class="[ activeName==8? 'is-active' : '' ]"></el-tab-pane>
            </el-tabs>
          </div>
          <div class="search" v-if="showSearch">
            <span class="closeSearch">
              <i @click="closeSearch" class="iconfont iconclose" style="font-size:16px;padding-top:2px;cursor:pointer;"></i>
            </span>
            <el-input v-model="input" @keyup.enter.native="search" autofocus="true" clearable style="outline:none;width:500px;border:none;" placeholder="搜索"></el-input>
          </div>
          <div class="iconBox2" v-if="showSearch">
            <i @click="search" class="iconfont iconsearch" style="font-size:20px;cursor:pointer"></i>
          </div>
          <div class="iconBox" v-else>
            <i @click="searchIt" class="iconfont iconsearch" style="font-size:20px;cursor:pointer"></i>
          </div>
        </div>
      </el-header>
      <div class="tianChong"></div>
      <!-- 筛选条件 -->
      <div class="screenCondition" v-if="showScreen">
        <p>
          <span style="font-family:PingFang-SC-Medium;font-weight:500;color:rgba(153,153,153,1);">筛选：</span>
          <span style="padding-left:40px">选择学校：
            <el-cascader size="small" clearable :options="options" v-model="selectedOptions" @change="handleChange" :props="props" placeholder="请选择"></el-cascader>
          </span>
          <span style="padding-left:40px">选择时间：
            <el-date-picker size="small" v-model="value" type="daterange" @change="handleChangeTime" range-separator="至" value-format="yyyy-MM-dd" format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </span>
        </p>
      </div>

      <main>
        <!-- 搜索文本 -->
        <p class="searchText" v-if="showSearchText">
          <el-input v-model="input1" @keyup.enter.native="searchText" clearable placeholder="搜索文本"></el-input>
          <span>
            <i @click="searchText" class="iconfont iconsearch" style="font-size:20px;"></i>
          </span>
        </p>
        <div class="firstList" v-if="showFirstList">
          <div class="banner" v-if="showBanner">
            <el-carousel :interval="3000" height="500px" arrow="never">
              <el-carousel-item v-for="(item,index) in carouselArr" :key="index">
                <img style="width:1170px;height:500px;" :src="item" alt>
              </el-carousel-item>
            </el-carousel>
          </div>
          <!-- 首页推荐列表 -->
          <!-- v-if="showMore" -->
          <div v-for="(item,index) in listArr" :key="index" class="infoList">
            <div class="tag" v-if="activeName==1">
              <span class="title">{{item.type_name}}</span>
              <span class="more" @click="seeMore(item.type)">查看更多</span>
            </div>
            <div v-for="(child,index) in item.data" :key="index" :class="[ activeName==1? 'list' : 'list otherListTag' ] " @click="toDetail(child.id,child.content_type)">
              <div class="cover" v-if="child.cover">
                <img :src="url+child.cover" alt>
              </div>
              <div :class="[ child.cover? 'content' : 'content otherListContent' ]  ">
                <span :class="[ child.cover? 'title' : 'title otherListContent' ]  ">{{child.title}}</span>
                <div :class="[ child.cover? 'texts' : 'texts otherListContent' ]  ">{{child.content}}</div>
                <span :class="[ child.cover? 'Label' : 'Label otherListContent' ]">
                  <span v-if="activeName==7">{{child.cms_school_name}} |</span>
                  <span>{{child.publisher}}</span>
                  <span v-if="child.act_type">{{child.activity_start_at}}</span>
                  <span v-else>{{child.created_at}}</span>
                </span>
              </div>
            </div>
          </div>

          <!-- 其他页面列表 -->
          <div v-if="activeName!=1||showOtherList" class="infoList">
            <div class="searchTab" v-if="showSearchTab">
              <el-tabs type="border-card" v-model="activeName1" @tab-click="handleClick1">
                <el-tab-pane label="校园爆料" name="1"></el-tab-pane>
                <el-tab-pane label="求职招聘" name="2"></el-tab-pane>
                <el-tab-pane label="考研快讯" name="3"></el-tab-pane>
                <el-tab-pane label="大学干货" name="4"></el-tab-pane>
                <el-tab-pane label="学术活动" name="5"></el-tab-pane>
                <el-tab-pane label="社团活动" name="6"></el-tab-pane>
                <el-tab-pane label="竞赛活动" name="7"></el-tab-pane>
              </el-tabs>
            </div>
            <div v-for="(item,index) in listArr" :key="index" :class="[ activeName==1? 'list' : 'list otherListTag' ] " @click="toDetail(item.id,item.content_type)">
              <div class="searchResultTab" v-if="showSearchResultTab"></div>
              <div class="cover" v-if="item.cover">
                <img :src="url+item.cover" alt>
              </div>
              <div :class="[ item.cover? 'content' : 'content otherListContent' ]  ">
                <span :class="[ item.cover? 'title' : 'title otherListContent' ]  ">{{item.title}}</span>
                <div :class="[ item.cover? 'texts' : 'texts otherListContent' ]  ">{{item.content}}</div>
                <span :class="[ item.cover? 'Label' : 'Label otherListContent' ]">
                  <span v-if="activeName==7">{{item.cms_school_name}} |</span>
                  <span>{{item.publisher}}</span>
                  <span v-if="item.act_type">{{item.created_at}}</span>
                  <span v-else>{{item.created_at}}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- 首页详情 -->
        <div class="firstDetail" v-if="showDetail">
          <div class="title">{{detailInfo.title}}</div>
          <div class="info">
            {{detailInfo.publisher}}
            <span v-if="detailInfo.act_type">{{detailInfo.created_at}}</span>
            <span v-else>{{detailInfo.created_at}}</span>
          </div>
          <div class="address" v-if="content_type!=3&&content_type!=1">
            <p v-if="detailInfo.activity_start_at&&detailInfo.act_type!=4">活动时间：{{detailInfo.activity_start_at}}</p>
            <p v-if="detailInfo.address">活动地点：{{detailInfo.address}}</p>
            <p v-if="detailInfo.contest_enrol_address">
              报名链接：
              <a :href="detailInfo.contest_enrol_address" target="_blank">{{detailInfo.contest_enrol_address}}</a>
            </p>
            <p v-if="detailInfo.enrol_expire_at&&detailInfo.act_type==4">截止报名时间：{{detailInfo.enrol_expire_at}}</p>

          </div>
          <div class="address" v-if="detailInfo.is_display_date_info==1&&content_type==3">
            <p v-if="detailInfo.receive_type==1">
              百度云下载链接：{{this.baiduUrl}}
              <span class="copy-btn" @click="copy" :data-clipboard-text="detailInfo.url">复制</span>
            </p>
            <p v-if="detailInfo.receive_type==1">
              百度云提取密码：{{detailInfo.url_code}}
              <span class="copy-btn" @click="copy" :data-clipboard-text="detailInfo.url_code">复制</span>
            </p>
            <p v-if="detailInfo.receive_type==2">领取方式：{{detailInfo.receive_type_name}}</p>
            <p v-if="detailInfo.receive_type==2">
              微信号：{{detailInfo.receive_wechat_id}}
              <span class="copy-btn" @click="copy" :data-clipboard-text="detailInfo.receive_wechat_id">复制</span>
            </p>
          </div>
          <div class="video" v-if="detailInfo.video_url" style="cursor:pointer;">
            <video controls="controls" :src="detailInfo.video_url" style="width:1110px;height:564px;margin:26px;"></video>
          </div>
          <div class="content">
            <p v-if="detailInfo.content" v-html="detailInfo.content"></p>
            <p v-if="detailInfo.introduction" v-html="detailInfo.introduction"></p>
            <p v-if="detailInfo.universities_content" v-html="detailInfo.universities_content"></p>
          </div>
          <div class="switchPage">
            <div class="prevPage" @click="toPrevPage(detailInfo.prev_id)">
              <span>上一篇：</span>
              {{detailInfo.prev_title?detailInfo.prev_title:"这是第一篇"}}
            </div>
            <div class="nextPage" @click="toNextPage(detailInfo.next_id)">
              <span>下一篇：</span>
              {{detailInfo.next_title?detailInfo.next_title:"这是最后一篇"}}
            </div>
          </div>
        </div>
        <!-- 缺损图 -->
        <div class="defect" v-if="total==0">
          <img :src="baseUrl+'defect.jpg'" alt>
        </div>
        <!-- 广告 -->
        <div :class="[ activeName!=3&&activeName!=7||detailAdvert? 'advertisement' : 'advertisement otherListAdvert' ]" v-if="showAdvertisement">
          <img style="width:240px;height:300px;background:#F5F5F5;" :src="baseUrl+'PC-QR code.jpg'" alt>
        </div>
        <!-- 底部分页 -->
        <div class="bottomPagination" v-if="showBottomPagination&&total!=0">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-size="pagesize" layout="prev, pager, next" :total="total"></el-pagination>
        </div>
      </main>

      <footer>
        <div class="footer d_jump">
          <div class="pageCenter footerBox">
            <div>
              <img :src="baseUrl+'saomajinruxiaochengxu.png'" style="border-radius:8px;" alt>
              <p>扫码进入小程序</p>
            </div>
            <div>
              <img :src="baseUrl+'saomalianxi.png'" alt>
              <p>扫码关注公众号</p>
            </div>
            <div>
              <p>快速链接</p>
              <li>
                <a @click="toTab1">求职招聘</a>
              </li>
              <li>
                <a @click="toTab2">考研快讯</a>
              </li>
              <li>
                <a @click="toTab3">大学干货</a>
              </li>
              <li>
                <a @click="toTab4">学术活动</a>
              </li>
              <li>
                <a @click="toTab5">社团活动</a>
              </li>
              <li>
                <a @click="toTab6">竞赛活动</a>
              </li>
            </div>
            <div>
              <p>相关动态</p>
              <li>
                <a href="https://weibo.com/6728174620/manage" target="_blank">奇集-官方微博</a>
              </li>
              <li>
                <a href="https://www.jianshu.com/u/3a03d6a70915" target="_blank">奇集-简书主页</a>
              </li>
              <li>
                <a href="https://www.zhihu.com/people/qi-ji-xiao-yuan/activities" target="_blank">奇集-知乎主页</a>
              </li>
              <li>
                <a href="https://kuaibao.qq.com/s/MEDIANEWSLIST?chlid=13073989" target="_blank">奇集-企鹅号</a>
              </li>
              <li>
                <a href="https://www.toutiao.com/c/user/104789341021/#mid=1612923839630350" target="_blank">奇集-头条号</a>
              </li>
            </div>
            <div>
              <p>友情链接</p>
              <li>
                <a href="https://www.izhanchi.com/Home" target="_blank">易展翅</a>
              </li>
              <li>
                <a href="http://zun1.com/" target="_blank">深圳尊一</a>
              </li>
            </div>
          </div>
          <div class="content">
            <p>产品特色：社团管理、社团赞助、校园活动、活动报名</p>
            <p>公司介绍：深圳奇学信息科技有限公司，为高校学生提供成绩查询、干货资源、考研信息、学术活动信息等服务。</p>
            <p>公司电话：（0755）-86549981. 公司地址：深圳市南山区桃源街道金骐智谷大厦1103室</p>
            <p>粤ICP备11086200号. Copyright 2019 www.54qj.com All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </el-container>
  </div>
</template>
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?82c2c1dc9e1ae7b2413635cf0e667405";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
import {
  getActList,
  getNewsList,
  getRecommendList,
  getActDetail,
  getNewsDetail,
  getDriedFoodDetail,
  getDriedFoodList,
  getSchool
} from "@/api/api";
import url from "@/utils/url";
import Clipboard from "clipboard";
export default {
  name: "",
  props: [""],
  data() {
    return {
      baiduUrl: "",
      detailAdvert: false,
      loading: true,
      baseUrl: "http://54qjapi.54qn.cn/img/qiji-official-website/2.0/",
      url: url.url,
      activeName: "1",
      activeName1: "",
      carouselArr: [
        "http://54qjapi.54qn.cn/img/qiji-official-website/2.0/banner.jpg"
      ],
      shouCode: false,
      showTab: true,
      showSearch: false,
      showScreen: false,
      showFirstList: true,
      showOtherList: false,
      showBottomPagination: false,
      showDetail: false,
      showAdvertisement: false,
      showSearchResultTab: false,
      showSearchText: false,
      showBanner: true,
      showMore: true,
      showSearchTab: false,
      input: "",
      input1: "",
      options: [],
      selectedOptions: [],
      value: "",
      props: {
        value: "area_id",
        children: "schools"
      },
      listArr: [],
      page: 1,
      pagesize: 25,
      act_type: "",
      take_type: "",
      cms_school_id: "",
      activity_start_at: "",
      activity_expire_at: "",
      detailInfo: "",
      total: 1,
      cms_school_id: ""
    };
  },
  components: {},
  mounted() {
    this.id = this.$route.query.id;
    this.content_type = this.$route.query.content_type;
    if (this.$route.query.activeName) {
      this.activeName = this.$route.query.activeName;
    } else {
      this.activeName = "1";
    }
    if (this.id && this.content_type) {
      this.showFirstList = false;
      this.showOtherList = false;
      this.showDetail = true;
      this.showAdvertisement = true;
      this.getDetailInfo();
    } else {
      this.getRecommendList();
    }
  },
  methods: {
    closeSearch() {
      this.showSearch = false;
      this.showTab = true;
    },
    copy() {
      var clipboard = new Clipboard(".copy-btn");
      clipboard.on("success", e => {
        this.$message({
          message: "复制成功",
          type: "success"
        });
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        Toast("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
    },
    toTab(act) {},
    toTab1() {
      this.activeName = "3";
      this.handleClick();
    },
    toTab2() {
      this.activeName = "4";
      this.handleClick();
    },
    toTab3() {
      this.activeName = "5";
      this.handleClick();
    },
    toTab4() {
      this.activeName = "6";
      this.handleClick();
    },
    toTab5() {
      this.activeName = "7";
      this.handleClick();
    },
    toTab6() {
      this.activeName = "8";
      this.handleClick();
    },
    toPrevPage(id) {
      this.id = id;
      if (this.id) {
        this.$router.push({
          path: "/",
          query: {
            id: this.id,
            content_type: this.content_type
          }
        });
        this.getDetailInfo();
      }
    },
    toNextPage(id) {
      this.id = id;
      if (this.id) {
        this.$router.push({
          path: "/",
          query: {
            id: this.id,
            content_type: this.content_type
          }
        });
        this.getDetailInfo();
      }
    },
    getDetailInfo() {
      this.loading = true;
      if (this.content_type == 1) {
        getNewsDetail(this.id).then(res => {
          this.loading = false;
          this.detailInfo = res.data;
          if (this.detailInfo.url.length > 15) {
            this.baiduUrl = `${this.detailInfo.url.substring(0, 15)}...`;
          } else {
            this.baiduUrl = this.detailInfo.url;
          }
          this.total = 1;
        });
      } else if (this.content_type == 2) {
        getActDetail(this.id).then(res => {
          this.loading = false;
          this.detailInfo = res.data;
          if (this.detailInfo.url.length > 15) {
            this.baiduUrl = `${this.detailInfo.url.substring(0, 15)}...`;
          } else {
            this.baiduUrl = this.detailInfo.url;
          }
          this.total = 1;
        });
      } else if (this.content_type == 3) {
        getDriedFoodDetail(this.id).then(res => {
          this.loading = false;
          this.detailInfo = res.data;
          if (this.detailInfo.url.length > 60) {
            this.baiduUrl = `${this.detailInfo.url.substring(0, 60)}...`;
          } else {
            this.baiduUrl = this.detailInfo.url;
          }
          this.total = 1;
        });
      }
      this.backTop();
      this.detailAdvert = true;
    },
    backTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    seeMore(type) {
      if (type == 1) {
        this.activeName = "2";
        this.handleClick();
      } else if (type == 2) {
        this.activeName = "3";
        this.handleClick();
      } else if (type == 3) {
        this.activeName = "4";
        this.handleClick();
      } else if (type == 4) {
        this.activeName = "5";
        this.handleClick();
      } else if (type == 5) {
        this.activeName = "6";
        this.handleClick();
      } else if (type == 6) {
        this.activeName = "7";
        this.handleClick();
      } else if (type == 7) {
        this.activeName = "8";
        this.handleClick();
      }
    },
    toIndex() {
      this.activeName = "1";
      this.showSearch = false;
      this.handleClick();
    },
    getActList() {
      getActList(
        this.page,
        this.pagesize,
        this.act_type,
        this.take_type,
        this.input,
        this.cms_school_id,
        this.activity_start_at,
        this.activity_expire_at
      ).then(res => {
        this.loading = false;
        this.listArr = res.data.data;
        this.total = res.data.meta.total;
        this.backTop();
      });
    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(page) {
      this.page = page;
      this.showBanner = false;
      this.loading = true;
      if (this.activeName != "1") {
        this.showBottomPagination = true;
      } else {
        this.showBottomPagination = false;
      }
      if (this.activeName == "1") {
        this.showAdvertisement = false;
        this.showTab = true;
        this.showFirstList = true;
        this.getRecommendList();
      } else if (this.activeName == "2") {
        this.showScreen = false;
        getNewsList(this.page, this.pagesize, this.input).then(res => {
          this.loading = false;
          this.listArr = res.data.data;
          this.total = res.meta.total;
          this.backTop();
        });
      } else if (this.activeName == "3") {
        this.showScreen = true;
        this.act_type = 2;
        this.getActList();
      } else if (this.activeName == "4") {
        this.showScreen = false;
        this.act_type = 5;
        this.getActList();
      } else if (this.activeName == "5") {
        this.showScreen = false;
        getDriedFoodList(this.page, this.pagesize, this.input).then(res => {
          this.loading = false;
          this.listArr = res.data.data;
          this.total = res.data.meta.total;
          this.backTop();
        });
      } else if (this.activeName == "6") {
        this.showScreen = false;
        this.act_type = 3;
        this.getActList();
      } else if (this.activeName == "7") {
        this.act_type = 1;
        this.showScreen = true;
        this.getActList();
      } else if (this.activeName == "8") {
        this.act_type = 4;
        this.showScreen = false;
        this.getActList();
      }
      if (this.activeName1 == "1") {
        this.showScreen = false;
        getNewsList(this.page, this.pagesize, this.input).then(res => {
          this.loading = false;
          this.listArr = res.data.data;
          this.total = res.meta.total;
          this.backTop();
        });
      } else if (this.activeName1 == "2") {
        this.showScreen = true;
        this.act_type = 2;
        this.getActList();
      } else if (this.activeName1 == "3") {
        this.showScreen = false;
        this.act_type = 5;
        this.getActList();
      } else if (this.activeName1 == "4") {
        this.showScreen = false;
        getDriedFoodList(this.page, this.pagesize, this.input).then(res => {
          this.loading = false;
          this.listArr = res.data.data;
          this.total = res.data.meta.total;
          this.backTop();
        });
      } else if (this.activeName1 == "5") {
        this.showScreen = false;
        this.act_type = 3;
        this.getActList();
      } else if (this.activeName1 == "6") {
        this.act_type = 1;
        this.showScreen = true;
        this.getActList();
      } else if (this.activeName1 == "7") {
        this.act_type = 4;
        this.showScreen = false;
        this.getActList();
      }
    },
    //   获取列表数据
    getRecommendList() {
      getRecommendList().then(res => {
        this.loading = false;
        this.listArr = res.data;
        this.total = res.data.length;
        this.backTop();
      });
    },
    handleChange(val) {
      this.loading = true;
      this.cms_school_id = val[1];
      if (this.cms_school_id == undefined) {
        this.cms_school_id = "";
      }
      if (this.activeName == "1") {
        this.showAdvertisement = false;
        this.showTab = true;
        this.showBanner = true;
        this.getRecommendList();
      } else if (this.activeName == "2") {
        this.showScreen = false;
        this.showBanner = false;
        getNewsList(this.page, this.pagesize, this.input).then(res => {
          this.loading = false;
          this.listArr = res.data.data;
          this.total = res.data.meta.total;
          this.backTop();
        });
      } else if (this.activeName == "3") {
        this.showBanner = false;
        this.showScreen = true;
        this.act_type = 2;
        this.getActList();
      } else if (this.activeName == "4") {
        this.showBanner = false;
        this.showScreen = false;
        this.act_type = 5;
        this.getActList();
      } else if (this.activeName == "5") {
        this.showBanner = false;
        this.showScreen = false;
        getDriedFoodList(this.page, this.pagesize, this.input).then(res => {
          this.loading = false;
          this.listArr = res.data.data;
          this.total = res.data.meta.total;
          this.backTop();
        });
      } else if (this.activeName == "6") {
        this.showBanner = false;
        this.showScreen = false;
        this.act_type = 3;
        this.getActList();
      } else if (this.activeName == "7") {
        this.showBanner = false;
        this.act_type = 1;
        this.showScreen = true;
        this.getActList();
      } else if (this.activeName == "8") {
        this.showBanner = false;
        this.act_type = 4;
        this.showScreen = false;
        this.getActList();
      }
    },
    handleChangeTime(val) {
      this.loading = true;
      if (val) {
        this.activity_start_at = val[0];
        this.activity_expire_at = val[1];
      } else {
        this.activity_start_at = "";
        this.activity_expire_at = "";
      }

      if (this.activeName == "1") {
        this.showAdvertisement = false;
        this.showTab = true;
        this.showBanner = true;
        this.getRecommendList();
      } else if (this.activeName == "2") {
        this.showScreen = false;
        this.showBanner = false;

        getNewsList(this.page, this.pagesize, this.input).then(res => {
          this.loading = false;
          this.listArr = res.data.data;
          this.total = res.data.meta.total;
          this.backTop();
        });
      } else if (this.activeName == "3") {
        this.showBanner = false;
        this.showScreen = true;
        this.act_type = 2;
        this.getActList();
      } else if (this.activeName == "4") {
        this.showBanner = false;
        this.showScreen = false;
        this.act_type = 5;
        this.getActList();
      } else if (this.activeName == "5") {
        this.showBanner = false;
        this.showScreen = false;

        getDriedFoodList(this.page, this.pagesize, this.input).then(res => {
          this.loading = false;
          this.listArr = res.data.data;
          this.total = res.data.meta.total;
          this.backTop();
        });
      } else if (this.activeName == "6") {
        this.showBanner = false;
        this.showScreen = false;
        this.act_type = 3;
        this.getActList();
      } else if (this.activeName == "7") {
        this.showBanner = false;
        this.act_type = 1;
        this.showScreen = true;
        this.getActList();
      } else if (this.activeName == "8") {
        this.showBanner = false;
        this.act_type = 4;
        this.showScreen = false;
        this.getActList();
      }
    },
    toDetail(id, content_type) {
      let routeUrl = this.$router.resolve({
        path: "/",
        query: { id, content_type, activeName: this.activeName }
      });
      window.open(routeUrl.href, "_blank");
      //   this.$router.push({
      //       path:"/index",
      //       query:{
      //           id,
      //           content_type
      //       }
      //   })
    },
    search() {
      if (this.input) {
        this.activeName1 = "1";
        getNewsList(this.page, this.pagesize, this.input).then(res => {
          this.backTop();
          this.loading = false;
          this.input1 = this.input;
          this.activeName = "2";
          this.listArr = res.data.data;
          this.total = res.data.meta.total;
          this.showFirstList = true;
          this.showSearchResultTab = false;
          this.showOtherList = true;
          this.showScreen = false;
          this.showBanner = false;
          this.showMore = false;
          this.showBottomPagination = true;
          this.showSearchText = true;
          this.showSearch = false;
          this.showSearchTab = true;
          this.showTab = true;
          this.showDetail = false;
          this.showAdvertisement = false;
        });
      }
    },
    searchIt() {
      this.showTab = false;
      this.showSearch = true;
    },
    searchText() {
      this.showSearchText = true;
      this.input = this.input1;
      if (this.input) {
        getNewsList(this.page, this.pagesize, this.input1).then(res => {
          this.activeName1 = "1";
          this.backTop();
          this.loading = false;
          this.listArr = res.data.data;
          this.total = res.data.meta.total;
          this.showFirstList = true;
          this.showSearchResultTab = false;
          this.showOtherList = true;
          this.showScreen = false;
          this.showBanner = false;
          this.showMore = false;
          this.showBottomPagination = true;
          this.showSearchText = true;
          this.showSearch = false;
          this.showSearchTab = true;
        });
      }
    },
    handleClick1() {
      this.activeName = "2";
      this.page = "";
      this.loading = true;
      if (this.activeName1 == "1") {
        getNewsList(this.page, this.pagesize, this.input).then(res => {
          this.loading = false;
          this.listArr = res.data.data;
          this.total = res.data.meta.total;
          this.backTop();
        });
      } else if (this.activeName1 == "2") {
        this.act_type = 2;
        this.getActList();
      } else if (this.activeName1 == "3") {
        this.act_type = 5;
        this.getActList();
      } else if (this.activeName1 == "4") {
        getDriedFoodList(this.page, this.pagesize, this.input).then(res => {
          this.loading = false;
          this.listArr = res.data.data;
          this.total = res.data.meta.total;
          this.backTop();
        });
      } else if (this.activeName1 == "5") {
        this.act_type = 3;
        this.getActList();
      } else if (this.activeName1 == "6") {
        this.act_type = 1;
        this.getActList();
      } else if (this.activeName1 == "7") {
        this.act_type = 4;
        this.getActList();
      }
    },
    getSchool() {
      getSchool().then(res => {
        this.options = res.data;
      });
    },
    // 切换Tab
    handleClick(tab, event) {
      this.total = 0;
      this.page = "";
      this.input = "";
      this.selectedOptions = [];
      this.value = "";
      this.cms_school_id = "";
      this.activity_start_at = "";
      this.activity_expire_at = "";
      this.showDetail = false;
      this.showFirstList = true;
      this.showOtherList = true;
      this.showSearchText = false;
      this.showSearchTab = false;
      this.showAdvertisement = true;
      this.page = 1;
      this.loading = true;
      if (this.activeName != "1") {
        this.showBottomPagination = true;
      } else {
        this.showBottomPagination = false;
      }
      if (this.activeName == "1") {
        this.showOtherList = false;
        this.showFirstList = true;
        this.showScreen = false;
        this.showAdvertisement = false;
        this.showTab = true;
        this.showBanner = true;
        this.getRecommendList();
      } else if (this.activeName == "2") {
        this.showScreen = false;
        this.showBanner = false;
        getNewsList(this.page, this.pagesize, this.input).then(res => {
          this.loading = false;
          this.listArr = res.data.data;
          this.total = res.data.meta.total;
          this.backTop();
        });
      } else if (this.activeName == "3") {
        this.showBanner = false;
        this.showScreen = true;
        this.act_type = 2;
        this.getActList();
        this.getSchool();
      } else if (this.activeName == "4") {
        this.showBanner = false;
        this.showScreen = false;
        this.act_type = 5;
        this.getActList();
      } else if (this.activeName == "5") {
        this.showBanner = false;
        this.showScreen = false;
        getDriedFoodList(this.page, this.pagesize, this.input).then(res => {
          this.loading = false;
          this.listArr = res.data.data;
          this.total = res.data.meta.total;
          this.backTop();
        });
      } else if (this.activeName == "6") {
        this.showBanner = false;
        this.showScreen = false;
        this.act_type = 3;
        this.getActList();
      } else if (this.activeName == "7") {
        this.showBanner = false;
        this.act_type = 1;
        this.showScreen = true;
        this.getActList();
        this.getSchool();
      } else if (this.activeName == "8") {
        this.showBanner = false;
        this.act_type = 4;
        this.showScreen = false;
        this.getActList();
      }
      this.$router.push({
        path: "/"
      });
    },
    enter() {
      this.shouCode = true;
    },
    leave() {
      this.shouCode = false;
    }
  },
  watch: {}
};
</script>
<style lang='scss' scoped>
.tianChong {
  height: 60px;
}
a {
  cursor: pointer;
}
.defect {
  width: 1170px;
  height: 950px;
  margin: 0 auto;
  background: #000;
}
.searchTab {
  height: 40px;
  overflow: hidden;
}
.el-input_inner {
  border-radius: 0px;
}
.searchText {
  width: 620px;
  height: 40px;
  margin: 30px auto;
  background: #f5f5f5;
  .el-input {
    width: 560px;
    float: left;
  }
  span {
    float: right;
    width: 60px;
    height: 40px;
    background: rgba(255, 185, 12, 1);
    text-align: center;
    line-height: 40px;
    cursor: pointer;
  }
}
.bottomPagination {
  width: 100%;
  margin: 0 auto;
  padding-top: 30px;
  background: #f5f5f5;
  display: flex;
  .el-pagination {
    margin: 0 auto;
  }
}
.el-header {
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  .navBox {
    width: 1170px;
    height: 60px;
    margin: 0 auto;
    background: #ffffff;
    .logo {
      float: left;
    }
    .tabBtn {
      padding-left: 50px;
      padding-top: 6px;
      float: left;
      font-size: 16px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .search {
      padding-left: 200px;
      padding-top: 10px;
      float: left;
      .closeSearch {
        display: inline-block;
        width: 38px;
        height: 39px;
        text-align: center;
      }
    }
    .iconBox {
      float: left;
      padding: 14px 0 0 300px;
    }
    .iconBox2 {
      float: left;
      padding: 16px 0 0 100px;
    }
  }
}
footer {
  .footer {
    background: rgba(26, 26, 26, 1);
    .footerBox {
      display: flex;
      justify-content: flex-start;
      padding-top: 50px;
      height: 326px;
      margin: 0 auto;
      width: 1200px;
      > div:nth-child(1) {
        margin-left: 120px;
        width: 180px;
        height: 180px;
        flex-shrink: 0;
        img {
          width: 100%;
          height: 100%;
        }
        p {
          text-align: center;
          margin-top: 20px;
          font-size: 18px;
          color: #fff;
        }
      }
      > div:nth-child(2) {
        margin-left: 40px;
        width: 180px;
        height: 180px;
        flex-shrink: 0;
        img {
          width: 100%;
          height: 100%;
        }
        p {
          text-align: center;
          margin-top: 20px;
          font-size: 18px;
          color: #fff;
        }
      }
      > div:nth-child(3),
      > div:nth-child(4),
      > div:nth-child(5) {
        margin-left: 100px;
        p {
          color: #fff;
          font-size: 18px;
          margin-bottom: 20px;
        }
        li {
          list-style: none;
          a {
            color: #999;
            font-size: 14px;
            line-height: 28px;
          }
        }
      }
    }
    .content {
      border-top: 1px solid #333333;
      text-align: center;
      color: #fff;
      font-size: 14px;
      line-height: 25px;
      padding-bottom: 10px;
      > p:nth-child(1) {
        margin-top: 20px;
      }
    }
  }
}
.screenCondition {
  width: 1170px;
  height: 60px;
  margin: 0 auto;
}
main {
  background-color: #f5f5f5;
  color: #333;
  padding-bottom: 60px;
  .firstList {
    margin-top: 28px;
    position: relative;
  }
  .firstDetail {
    width: 1170px;
    margin: 28px auto;
    background: #fff;
    .title {
      padding: 30px;
      width: 1000px;
      height: 29px;
      font-size: 28px;
      line-height: 30px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
    }
    .info {
      padding: 30px;
      width: 1170px;
      height: 14px;
      font-size: 14px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      line-height: 24px;
    }
    .address {
      margin: 30px;
      width: 1110px;
      height: 96px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      background: rgba(245, 245, 245, 1);
      > p {
        padding-top: 16px;
        width: 1076px;
        font-size: 16px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 0px;
        text-indent: 34px;
      }
      span {
        cursor: pointer;
        float: right;
        font-size: 16px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(87, 107, 149, 1);
      }
    }
    .content {
      width: 1110px;
      font-size: 16px;
      padding-left: 30px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 32px;
      padding-bottom: 200px;
      overflow: hidden;
    }
    .switchPage {
      width: 1170px;
      height: 81px;
      .prevPage {
        margin-left: 30px;
        padding: 0 10px;
        float: left;
        border: 1px solid rgba(230, 230, 230, 1);
        height: 42px;
        font-size: 16px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 38px;
        cursor: pointer;
        text-align: center;
      }
      .prevPage:hover {
        color: rgba(255, 185, 12, 1);
        border: 1px solid rgba(255, 185, 12, 1);
      }
      .nextPage {
        margin-right: 30px;
        float: right;
        padding: 0 10px;
        height: 42px;
        font-size: 16px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 38px;
        cursor: pointer;
        border: 1px solid rgba(230, 230, 230, 1);
        text-align: center;
      }
      .nextPage:hover {
        color: rgba(255, 185, 12, 1);
        border: 1px solid rgba(255, 185, 12, 1);
      }
    }
  }
  .advertisement {
    width: 300px;
    height: 820px;
    position: fixed;
    left: 1550px;
    top: 88px;
  }
  .banner {
    width: 1170px;
    height: 500px;
    margin: 0 auto;
    position: relative;
    .slogan {
      position: absolute;
      left: 140px;
      bottom: 126px;
    }
  }
  .infoList {
    width: 1170px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 1);
    margin-top: 26px;
    .tag {
      width: 1112px;
      height: 60px;
      margin-left: 30px;
      font-size: 16px;
      .title {
        text-align: left;
        line-height: 60px;
        float: left;
      }
      .more {
        text-align: right;
        line-height: 60px;
        font-size: 16px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(87, 107, 149, 1);
        float: right;
        cursor: pointer;
      }
    }
    .list {
      width: 1170px;
      height: 190px;
      border-top: 1px solid #f5f5f5;
      cursor: pointer;

      .cover {
        margin: 20px;
        width: 150px;
        height: 150px;
        float: left;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        img {
         width: 100%;
         height: 100%;
         border: 1px solid #f5f5f5;
        }
      }
      .content {
        width: 959px;
        height: 190px;
        float: left;
        .title {
          width: 959px;
          height: 26px;
          font-size: 20px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
          float: left;
          margin-top: 27px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .title:hover {
          color: #576b95;
        }
        .texts {
          width: 959px;
          height: 68px;
          font-size: 16px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
          line-height: 24px;
          float: left;
          margin-top: 14px;
          margin-bottom: 15px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
        .label {
          width: 959px;
          height: 14px;
          font-size: 14px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
          line-height: 24px;
          float: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .list:hover {
      background: rgba(250, 250, 250, 1);
    }
  }
  .searchResultTab {
    width: 1170px;
    margin: 0 auto;
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf !important;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6 !important;
}
// 其他列表页附加样式
.otherListAdvert {
  top: 148px !important;
}
.highLight {
  color: orange;
}
.otherListContent {
  width: 1129px !important;
  margin-left: 11px;
}
</style>
