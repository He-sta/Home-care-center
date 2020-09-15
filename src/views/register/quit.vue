<template>
    <div class="main">
    <div class="box">
        <el-popover
            placement="right"
            width="400"
            trigger="click">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="退住人" prop="custId">
                    <el-select v-model="ruleForm.custId" placeholder="请选择退住人">
                        <el-option
                                v-for="item in options"
                                :key="item.custId"
                                :label="item.custName"
                                :value="item.custId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="退住类型" prop="type">
                    <el-select v-model="ruleForm.type" placeholder="请选择类型">
                        <el-option label="自愿" value="自愿"></el-option>
                        <el-option label="到期" value="到期"></el-option>
                        <el-option label="强退" value="强退"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="原因" prop="season">
                    <el-input v-model="ruleForm.season"></el-input>
                </el-form-item>
                <el-form-item label="申请时间">
                    <el-date-picker
                            v-model="ruleForm.applyTime"
                            type="datetime"
                            placeholder="申请时间"
                            :default-time="'12:00:00'">
                    </el-date-picker>
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
                    type: '',           //类型
                    season: '',        //原因
                    applyTime:'',         //申请时间
                    tips: '',    //备注

                }
            }
    }
}
</script>