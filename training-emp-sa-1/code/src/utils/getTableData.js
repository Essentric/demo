import getScore from '@/utils/getScore';

export default function (summaryData) {
  const summaryDataInfo = summaryData;
  // if (summaryData.length !== 0) {
  //   summaryDataInfo = summaryData;
  // } else {
  //   summaryDataInfo = JSON.parse(localStorage.getItem('summaryData'));
  // }
  const map = new Map(); //  Map将拿回来的数据按同一个id归类
  const arr = [];
  summaryDataInfo.forEach((element) => {
    map.set(element.staff_id, []);
  });
  summaryDataInfo.forEach((element) => {
    map.get(element.staff_id).push({
      code: element.code,
      score: element.score,
      staff: element.staff,
      survey: element.survey,
    });
  });
  map.forEach((value, key) => { //  将Map里的数据按照el-table的数据格式存储
    const summaryTableData = {};
    summaryTableData.scoreSum = [];
    value.forEach((element) => {
      summaryTableData.id = key;
      const scoreSum = getScore.getScoreSum(element.code, element.score);
      const sumObj = getScore.getEvaluation(element.code, scoreSum);
      summaryTableData[element.code] = element.score - 0;
      summaryTableData.staff_id = element.staff.id;
      summaryTableData.name = element.staff.name;
      summaryTableData.sex = element.staff.sex;
      summaryTableData.staff_no = element.staff.staff_no;
      summaryTableData.desc = element.survey.desc;
      summaryTableData.survey_id = element.survey.id;
      summaryTableData.survey_name = element.survey.name;
      summaryTableData.show = element.survey.show;
      summaryTableData.scoreSum.push(sumObj);
    });
    arr.push(summaryTableData);
  });
  return arr.reverse();
}
