/*global emojis*/
require('./main.js');
var emojiCodes = ['\ue415', '\ue056', '\ue057', '\ue414', '\ue405', '\ue106', '\ue418', '\ue417', '\ue40D', '\ue404',
    '\ue40A', '\ue105', '\ue409', '\ue40E', '\ue402', '\ue108', '\ue403', '\ue058', '\ue407', '\ue401',
    '\ue40F', '\ue40B', '\ue406', '\ue413', '\ue411', '\ue412', '\ue410', '\ue107', '\ue059', '\ue416',
    '\ue408', '\ue40C', '\ue11A', '\ue10C', '\ue022', '\ue023', '\ue329', '\ue32E', '\ue335', '\ue337',
    '\ue336', '\ue13C', '\ue331', '\ue03E', '\ue11D', '\ue05A', '\ue00E', '\ue421', '\ue00D', '\ue011',
    '\ue22E', '\ue22F', '\ue231', '\ue230', '\ue00F', '\ue14C', '\ue111', '\ue425', '\ue001', '\ue002',
    '\ue005', '\ue004', '\ue04E', '\ue11C', '\ue003', '\ue04A', '\ue04B', '\ue049', '\ue048', '\ue04C',
    '\ue13D', '\ue43E', '\ue04F', '\ue052', '\ue053', '\ue524', '\ue52C', '\ue52A', '\ue531', '\ue050',
    '\ue527', '\ue051', '\ue10B', '\ue52B', '\ue52F', '\ue109', '\ue01A', '\ue52D', '\ue521', '\ue52E',
    '\ue055', '\ue525', '\ue10A', '\ue522', '\ue054', '\ue520', '\ue032', '\ue303', '\ue307', '\ue308',
    '\ue437', '\ue445', '\ue11B', '\ue448', '\ue033', '\ue112', '\ue325', '\ue312', '\ue310', '\ue126',
    '\ue008', '\ue03D', '\ue00C', '\ue12A', '\ue009', '\ue145', '\ue144', '\ue03F', '\ue116', '\ue10F',
    '\ue101', '\ue13F', '\ue12F', '\ue311', '\ue113', '\ue30F', '\ue42B', '\ue42A', '\ue018', '\ue016',
    '\ue014', '\ue131', '\ue12B', '\ue03C', '\ue041', '\ue322', '\ue10E', '\ue43C', '\ue323', '\ue31C',
    '\ue034', '\ue035', '\ue045', '\ue047', '\ue30C', '\ue044', '\ue120', '\ue33B', '\ue33F', '\ue344',
    '\ue340', '\ue147', '\ue33A', '\ue34B', '\ue345', '\ue01D', '\ue10D', '\ue136', '\ue435', '\ue252',
    '\ue132', '\ue138', '\ue139', '\ue332', '\ue333', '\ue24E', '\ue24F', '\ue537'];
var imgList = [];
for(var index in emojiCodes){
    imgList.push(new Image().src=emojis(emojiCodes[index]));
}
document.getElementById('app').innerHTML = imgList.join();