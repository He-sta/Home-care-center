<template>
  <div class="main">
    <div class="box">
         <div class="search">
        <el-popover
            placement="right"
            width="400"
            trigger="click">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="外出人" prop="custId">
                    <el-select v-model="ruleForm.custId" placeholder="请选择外出人">
                        <el-option
                                v-for="item in options"
                                :key="item.custId"
                                :label="item.custName"
                                :value="item.custId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="外出事由" prop="outSeason">
                    <el-select v-model="ruleForm.outSeason" placeholder="请选择类型">
                        <el-option label="爬" value="爬"></el-option>
                        <el-option label="玩" value="玩"></el-option>
                        <el-option label="走" value="走"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="外出时间">
                    <el-date-picker
                            v-model="ruleForm.outTime"
                            type="datetime"
                            placeholder="外出时间"
                            :default-time="'12:00:00'">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="回院时间">
                    <el-date-picker
                            v-model="ruleForm.backTime"
                            type="datetime"
                            placeholder="回院时间"
                            :default-time="'12:00:00'">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="陪同人" prop="address">
                    <el-input v-model="ruleForm.accompany"></el-input>
                </el-form-item>
                <el-form-item label="与老人关系" prop="address">
                    <el-input v-model="ruleForm.relation"></el-input>
                </el-form-item>
                <el-form-item label="陪同人电话" prop="address">
                    <el-input v-model="ruleForm.accompanyPhone"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="tips">
                    <el-input type="textarea" v-model="ruleForm.tips"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
            <el-button slot="reference">click 激活</el-button>
            </el-popover>
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-input v-model="form.custName" placeholder="输入客户姓名"></el-input>
                    <el-button type="primary" @click="query">查询</el-button>
            </el-form>
        </div>
      <!--  <el-table
                v-loading="loading"
                element-loading-text="拼命加载中"
                :data="pageInfo.list"
                border
                style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left"  class="demo-table-expand">
                        <el-form-item label="客户ID:">
                            <span>{{ props.row.custId }}</span>
                        </el-form-item>
                        <el-form-item label="陪同人与老人关系:">
                            <span>{{ props.row.relation }}</span>
                        </el-form-item>
                        <el-form-item label="陪同人电话:">
                            <span>{{ props.row.accompanyPhone }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    type="index"
                    label="序号"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="checkinInfo.custName"
                    label="客户姓名"
                    width="130">
            </el-table-column>
            <el-table-column
                    prop="outSeason"
                    label="外出类型"
                    width="80">
            </el-table-column>
            <el-table-column
                    label="外出时间"
                    width="120">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.outTime|formatDatetime}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="预计回院时间"
                    width="120">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.backTime|formatDatetime}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="accompany"
                    label="陪同人"
                    width="120">
            </el-table-column>

            <el-table-column
                    label="是否审核"
                    width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.ischeck === '0' ">
                        <el-tag type="danger">
                            {{ scope.row.ischeck |formatischeck}}
                        </el-tag>
                    </span>
                    <span v-if="scope.row.ischeck === '1' ">
                        <el-tag type="success">
                            {{ scope.row.ischeck |formatischeck}}
                        </el-tag>
                    </span>
                </template>
            </el-table-column>

            <el-table-column
                    label="是否归来"
                    width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.isback === '0' ">
                        <el-tag type="danger">
                            {{ scope.row.isback |formatisback}}
                        </el-tag>
                    </span>
                    <span v-if="scope.row.isback === '1' ">
                        <el-tag type="success">
                            {{ scope.row.isback |formatisback}}
                        </el-tag>
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                    label="归院时间"
                    width="120">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.realbackTime|formatDatetime}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="middle"  icon="el-icon-edit" @click="update(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="middle" icon="el-icon-delete" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    label="审核登记">
                <template slot-scope="scope">
                    <el-button type="text" size="middle" icon="el-icon-check" @click="setIsCheck(scope.row)">审核 </el-button>
                    <el-button type="text" size="middle" @click="setIsBack(scope.row)">登记归来</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="total, prev, pager, next"
                @current-change="handleCurrentChange"
                :page-size="pageInfo.pageSize"
                :total="pageInfo.total">
        </el-pagination>-->
    </div>
</div>
</template>

<script>
export default {
    data() {
            return {
                host:'',
                ruleForm: {//定义form绑定的对象
                    custId: '',          //入住人ID
                    custName: '',     //入住人
                    outSeason: '',           //外出理由
                    outTime: '',        //外出时间
                    backTime:'',         //回院时间
                    accompany: '',    //陪同人
                    relation: '',    //与老人关系
                    accompanyPhone: '',    //陪同人电话
                    tips: '',    //备注
                }
            }
    }
}
</script>