<?php

/* 
salesrecord表：订单数据表
sal_id:{
    describe:订单ID，主键
}

com_id:{
    describe:商品ID,链接到商品数据表 
}

u_id{
    describe:用户ID，链接到用户数据表
}

u_address:{
    describe:用户地址，收货地址
}

u_phone:{
    describe:用户联系方式，收货联系方式
}

com_color:{
    describe:订单商品颜色
}

com_size:{
    describe:订单商品尺寸
}

com_number:{
    describe:订单商品数量
}

paymentMethod:{
    describe:订单商品付款方式
}

totalPrice:{
    describe:订单商品价格
}

state:{
    describe:{
        describe:订单状态
        '1' : 订单添加到购物车
        '2' : 订单已下单
        '3' : 订单已发货
        '4' : 订单已收货
    }
}

car_time:{
    describe:订单添加到购物车时间
}

buy_time:{
    describ:订单购买下单时间
}

shipments_time:{
    describe:订单发货时间
}

receiving_time:{
    describe:订单收货时间
}

sal_time:{
    describe:订单更新时间
}

user_delete:{
    describe:用户是否将订单记录删除 0 未删除  1已删除
    default:0
}

admin_delete:{
    describe:管理员是否将订单记录删除 0 未删除  1已被删除
    default:0
}





*/