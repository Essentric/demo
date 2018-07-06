export default {
  getScoreSum(code, _score) {
    let scoreSum;
    const score = _score - 0;
    switch (code) {
      case 'PL': switch (score) {
        case 0: scoreSum = 0;
          break;
        case 1: scoreSum = 8;
          break;
        case 2: scoreSum = 16;
          break;
        case 3: scoreSum = 25;
          break;
        case 4: scoreSum = 38;
          break;
        case 5: scoreSum = 45;
          break;
        case 6: scoreSum = 53;
          break;
        case 7: scoreSum = 64;
          break;
        case 8: scoreSum = 75;
          break;
        case 9: scoreSum = 82;
          break;
        case 10: scoreSum = 84;
          break;
        case 11: scoreSum = 86;
          break;
        case 12: scoreSum = 90;
          break;
        case 13: scoreSum = 92;
          break;
        case 14: scoreSum = 93;
          break;
        case 15: scoreSum = 95;
          break;
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22: scoreSum = 95;
          break;
        default: break;
      }
        break;
      case 'RI': switch (score) {
        case 0: scoreSum = 0;
          break;
        case 1: scoreSum = 3;
          break;
        case 2: scoreSum = 7;
          break;
        case 3: scoreSum = 16;
          break;
        case 4: scoreSum = 23;
          break;
        case 5: scoreSum = 32;
          break;
        case 6: scoreSum = 38;
          break;
        case 7: scoreSum = 49;
          break;
        case 8: scoreSum = 58;
          break;
        case 9: scoreSum = 66;
          break;
        case 10: scoreSum = 71;
          break;
        case 11: scoreSum = 77;
          break;
        case 12: scoreSum = 83;
          break;
        case 13: scoreSum = 86;
          break;
        case 14: scoreSum = 90;
          break;
        case 15: scoreSum = 95;
          break;
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22: scoreSum = 95;
          break;
        default: break;
      }
        break;
      case 'CO': switch (score) {
        case 0: scoreSum = 0;
          break;
        case 1: scoreSum = 3;
          break;
        case 2: scoreSum = 6;
          break;
        case 3: scoreSum = 11;
          break;
        case 4: scoreSum = 19;
          break;
        case 5: scoreSum = 29;
          break;
        case 6: scoreSum = 48;
          break;
        case 7: scoreSum = 55;
          break;
        case 8: scoreSum = 64;
          break;
        case 9: scoreSum = 72;
          break;
        case 10: scoreSum = 80;
          break;
        case 11: scoreSum = 82;
          break;
        case 12: scoreSum = 86;
          break;
        case 13: scoreSum = 90;
          break;
        case 14: scoreSum = 91;
          break;
        case 15: scoreSum = 93;
          break;
        case 16: scoreSum = 95;
          break;
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22: scoreSum = 95;
          break;
        default: break;
      }
        break;
      case 'SH': switch (score) {
        case 0: scoreSum = 0;
          break;
        case 1: scoreSum = 1;
          break;
        case 2: scoreSum = 4;
          break;
        case 3: scoreSum = 6;
          break;
        case 4: scoreSum = 12;
          break;
        case 5: scoreSum = 18;
          break;
        case 6: scoreSum = 23;
          break;
        case 7: scoreSum = 30;
          break;
        case 8: scoreSum = 36;
          break;
        case 9: scoreSum = 45;
          break;
        case 10: scoreSum = 50;
          break;
        case 11: scoreSum = 55;
          break;
        case 12: scoreSum = 64;
          break;
        case 13: scoreSum = 71;
          break;
        case 14: scoreSum = 75;
          break;
        case 15: scoreSum = 79;
          break;
        case 16: scoreSum = 83;
          break;
        case 17: scoreSum = 86;
          break;
        case 18: scoreSum = 87;
          break;
        case 19: scoreSum = 89;
          break;
        case 20: scoreSum = 92;
          break;
        case 21: scoreSum = 93;
          break;
        case 22: scoreSum = 95;
          break;
        default: break;
      }
        break;
      case 'ME': switch (score) {
        case 0: scoreSum = 0;
          break;
        case 1: scoreSum = 1;
          break;
        case 2: scoreSum = 4;
          break;
        case 3: scoreSum = 12;
          break;
        case 4: scoreSum = 23;
          break;
        case 5: scoreSum = 31;
          break;
        case 6: scoreSum = 41;
          break;
        case 7: scoreSum = 52;
          break;
        case 8: scoreSum = 61;
          break;
        case 9: scoreSum = 72;
          break;
        case 10: scoreSum = 82;
          break;
        case 11: scoreSum = 89;
          break;
        case 12: scoreSum = 92;
          break;
        case 13: scoreSum = 94;
          break;
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22: scoreSum = 94;
          break;
        default: break;
      }
        break;
      case 'TW': switch (score) {
        case 0: scoreSum = 0;
          break;
        case 1: scoreSum = 1;
          break;
        case 2: scoreSum = 6;
          break;
        case 3: scoreSum = 12;
          break;
        case 4: scoreSum = 19;
          break;
        case 5: scoreSum = 27;
          break;
        case 6: scoreSum = 37;
          break;
        case 7: scoreSum = 49;
          break;
        case 8: scoreSum = 60;
          break;
        case 9: scoreSum = 67;
          break;
        case 10: scoreSum = 74;
          break;
        case 11: scoreSum = 79;
          break;
        case 12: scoreSum = 83;
          break;
        case 13: scoreSum = 89;
          break;
        case 14: scoreSum = 94;
          break;
        case 15: scoreSum = 95;
          break;
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22: scoreSum = 95;
          break;
        default: break;
      }
        break;
      case 'IM': switch (score) {
        case 0: scoreSum = 0;
          break;
        case 1: scoreSum = 1;
          break;
        case 2: scoreSum = 2;
          break;
        case 3: scoreSum = 4;
          break;
        case 4: scoreSum = 8;
          break;
        case 5: scoreSum = 14;
          break;
        case 6: scoreSum = 19;
          break;
        case 7: scoreSum = 29;
          break;
        case 8: scoreSum = 36;
          break;
        case 9: scoreSum = 49;
          break;
        case 10: scoreSum = 61;
          break;
        case 11: scoreSum = 68;
          break;
        case 12: scoreSum = 77;
          break;
        case 13: scoreSum = 83;
          break;
        case 14: scoreSum = 86;
          break;
        case 15: scoreSum = 91;
          break;
        case 16: scoreSum = 93;
          break;
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22: scoreSum = 93;
          break;
        default: break;
      }
        break;
      case 'CF': switch (score) {
        case 0: scoreSum = 0;
          break;
        case 1: scoreSum = 11;
          break;
        case 2: scoreSum = 18;
          break;
        case 3: scoreSum = 31;
          break;
        case 4: scoreSum = 41;
          break;
        case 5: scoreSum = 51;
          break;
        case 6: scoreSum = 56;
          break;
        case 7: scoreSum = 67;
          break;
        case 8: scoreSum = 72;
          break;
        case 9: scoreSum = 78;
          break;
        case 10: scoreSum = 83;
          break;
        case 11: scoreSum = 85;
          break;
        case 12: scoreSum = 89;
          break;
        case 13: scoreSum = 93;
          break;
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22: scoreSum = 93;
          break;
        default: break;
      }
        break;
      case 'SP': switch (score) {
        case 0: scoreSum = 0;
          break;
        case 1: scoreSum = 8;
          break;
        case 2: scoreSum = 11;
          break;
        case 3: scoreSum = 24;
          break;
        case 4: scoreSum = 30;
          break;
        case 5: scoreSum = 46;
          break;
        case 6: scoreSum = 53;
          break;
        case 7: scoreSum = 64;
          break;
        case 8: scoreSum = 69;
          break;
        case 9: scoreSum = 74;
          break;
        case 10: scoreSum = 77;
          break;
        case 11: scoreSum = 85;
          break;
        case 12: scoreSum = 89;
          break;
        case 13: scoreSum = 92;
          break;
        case 14: scoreSum = 95;
          break;
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22: scoreSum = 95;
          break;
        default: break;
      }
        break;
      default: break;
    }
    return scoreSum;
  },
  getEvaluation(code, scoreSum) {
    let evaluation;
    switch (code) {
      case 'PL': if (scoreSum >= 0 && scoreSum <= 25) {
        evaluation = '避免';
      } else if (scoreSum > 25 && scoreSum <= 64) {
        evaluation = '次要';
      } else if (scoreSum > 64 && scoreSum <= 93) {
        evaluation = '自然';
      } else {
        evaluation = '优秀';
      }
        break;
      case 'RI': if (scoreSum >= 0 && scoreSum <= 23) {
        evaluation = '避免';
      } else if (scoreSum > 23 && scoreSum <= 66) {
        evaluation = '次要';
      } else if (scoreSum > 66 && scoreSum <= 90) {
        evaluation = '自然';
      } else {
        evaluation = '优秀';
      }
        break;
      case 'CO': if (scoreSum >= 0 && scoreSum <= 29) {
        evaluation = '避免';
      } else if (scoreSum > 29 && scoreSum <= 64) {
        evaluation = '次要';
      } else if (scoreSum > 64 && scoreSum <= 93) {
        evaluation = '自然';
      } else {
        evaluation = '优秀';
      }
        break;
      case 'SH': if (scoreSum >= 0 && scoreSum <= 23) {
        evaluation = '避免';
      } else if (scoreSum > 23 && scoreSum <= 64) {
        evaluation = '次要';
      } else if (scoreSum > 64 && scoreSum <= 95) {
        evaluation = '自然';
      } else {
        evaluation = '优秀';
      }
        break;
      case 'ME': if (scoreSum >= 0 && scoreSum <= 23) {
        evaluation = '避免';
      } else if (scoreSum > 23 && scoreSum <= 61) {
        evaluation = '次要';
      } else if (scoreSum > 61 && scoreSum <= 92) {
        evaluation = '自然';
      } else {
        evaluation = '优秀';
      }
        break;
      case 'TW': if (scoreSum >= 0 && scoreSum <= 27) {
        evaluation = '避免';
      } else if (scoreSum > 27 && scoreSum <= 67) {
        evaluation = '次要';
      } else if (scoreSum > 67 && scoreSum <= 94) {
        evaluation = '自然';
      } else {
        evaluation = '优秀';
      }
        break;
      case 'IM': if (scoreSum >= 0 && scoreSum <= 29) {
        evaluation = '避免';
      } else if (scoreSum > 29 && scoreSum <= 68) {
        evaluation = '次要';
      } else if (scoreSum > 68 && scoreSum <= 91) {
        evaluation = '自然';
      } else {
        evaluation = '优秀';
      }
        break;
      case 'CF': if (scoreSum >= 0 && scoreSum <= 18) {
        evaluation = '避免';
      } else if (scoreSum > 18 && scoreSum <= 67) {
        evaluation = '次要';
      } else if (scoreSum > 67 && scoreSum <= 89) {
        evaluation = '自然';
      } else {
        evaluation = '优秀';
      }
        break;
      case 'SP': if (scoreSum >= 0 && scoreSum <= 24) {
        evaluation = '避免';
      } else if (scoreSum > 24 && scoreSum <= 69) {
        evaluation = '次要';
      } else if (scoreSum > 69 && scoreSum <= 92) {
        evaluation = '自然';
      } else {
        evaluation = '优秀';
      }
        break;
      default: break;
    }
    const obj = { code, scoreSum, evaluation };
    return obj;
  },
  getDesc(code) {
    let description;
    switch (code) {
      case 'PL':
        description = '智多星';
        break;
      case 'RI':
        description = '外联者';
        break;
      case 'CO':
        description = '协调者';
        break;
      case 'SH':
        description = '鞭策者';
        break;
      case 'ME':
        description = '监督者';
        break;
      case 'TW':
        description = '凝聚者';
        break;
      case 'IM':
        description = '实干者';
        break;
      case 'CF':
        description = '善始善终者';
        break;
      case 'SP':
        description = '专家';
        break;
      default:
        break;
    }
    return description;
  },
};
