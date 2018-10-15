function handlePayBtnClick(){
	if(!haslogin){
		login();
	}else{
		if(isChild){
			msgbox.show('子账号不能购买');
		}else if(isStopVip){
			msgbox.show('暂停会员不能购买');
		}else if(!isSuperVip){
			msgbox.show('不是超级会员，请先购买会员');
		}else{
			
		}
	}
}
