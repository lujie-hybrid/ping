<!--
 * @author: lujie
 * @Date: 2020-06-12 15:22:11
 * @LastEditTime: 2020-09-04 14:22:04
 * @FilePath: \datashow\src\components\business\home\Desc.vue
 * @descripttion: [X X档案的档案馆描述]
 * @editor: [lujie]
-->
<template functional>
  <div class="desc f16 bg-module-desc">
    <p class="bg-title-left bg-title">档案馆概述</p>
    <p>
      X X市档案馆是隶属于中共X X市委、市政府的国家综合性档案馆，是X
      X地区永久保管重要档案的基地，是社会各界利用和研究档案史料的中心。至2018年底，馆藏档案资料1641947卷(册、件、盒、张)，其中档案891个全宗，纸质档案1228667卷、327350件、资料30854册，特殊载体档案55076张（盒、件）。这些档案、资料全面记载了X
      X地区社会发展的历程。馆藏档案，资料内容丰富，价值珍贵。
    </p>
    <p class="desc-type">
      按档案的门类分有：文书档案、科技档案、专门档案、声像档案、实物档案、光盘档案等。
    </p>
    <div class="desc-bottom">
      <p>联系电话：136xxxxx016</p>
      <p>地址：X X市档案馆</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.desc {
  color: $txt-a5e7f0;
  padding: 20px 30px 0 30px;
  text-align: justify;
  margin-bottom: 25px;
  height: 440px;
  line-height: 29px;
  box-sizing: border-box;
  &-type {
    margin: 10px 0;
  }
  &-bottom {
    text-align: right;
    margin-top: 20px;
    line-height: 30px;
  }
}
</style>
