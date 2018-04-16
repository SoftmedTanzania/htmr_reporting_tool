import {Injectable} from '@angular/core';
import {HttpClientService} from './http-client.service';
import {Observable} from "rxjs/Observable";
import * as _ from 'lodash';
export interface Dataset {
  id: string;
  name: string;
  periodType: string;
}

@Injectable()
export class DatasetService {

  _datasets: Dataset[];

  constructor(private http: HttpClientService) {
    // var forms = {
    //   "forms": [
    //   {
    //     "name": "Referrals Summary Form",
    //     "id": "9a214cf093a",
    //     "datasetId": "fNtltCTZ18U",
    //     "periodType": "Monthly",
    //     "sections": []
    //   },
    //   {
    //     "name": "Taarifa ya Robo Mwaka Huduma ya TB, HIV",
    //     "id": "df8b6e9e",
    //     "datasetId": "RlEAuBOOm1L",
    //     "periodType": "Quarterly",
    //     "sections": [
    //       {
    //         "categories": [
    //           "df8b6fc0",
    //           "df8b6c3c"
    //         ],
    //         "id": "df8b6d7c",
    //         "name": "Uchunguzi wa TB/DR-TB Ngazi ya jamii (TB screening at community level)",
    //         "items": [
    //           {
    //             "name": "Idadi ya wagonjwa waliogundulika kutoka familia zenye wagonjwa wa TB, DR-TB ya mapafu wakati wa ufuatiliaji",
    //             "id": "item1",
    //             "dataElements": [
    //               "FHIFORM0030",
    //               "FHIFORM0031",
    //               "FHIFORM0028",
    //               "FHIFORM0029"
    //             ]
    //           },
    //           {
    //             "name": "Idadi ya wagonjwa wanaohisiwa kuwa na TB/DR-TB na waliopewa rufaa",
    //             "id": "item2",
    //             "dataElements": [
    //               "FHIFORM0015",
    //               "FHIFORM0016",
    //               "FHIFORM0013",
    //               "FHIFORM0014"
    //             ]
    //           },
    //           {
    //             "name": "Idadi ya wagonjwa wanaohisiwa kuwa na TB/DR-TB",
    //             "id": "item3",
    //             "dataElements": [
    //               "FHIFORM0007",
    //               "FHIFORM0008",
    //               "FHIFORM0005",
    //               "FHIFORM0006"
    //             ]
    //           },
    //           {
    //             "name": "Idadi ya wahisiwa waliopatikana na TB/DR-TB",
    //             "id": "item4",
    //             "dataElements": [
    //               "FHIFORM0011",
    //               "FHIFORM0012",
    //               "FHIFORM0009",
    //               "FHIFORM0010"
    //             ]
    //           },
    //           {
    //             "name": "Idadi ya waliochunguzwa  TB (Jumla ya walioko katika fomu namba TB12)",
    //             "id": "item5",
    //             "dataElements": [
    //               "FHIFORM0003",
    //               "FHIFORM0004",
    //               "FHIFORM0001",
    //               "FHIFORM0002"
    //             ]
    //           },
    //           {
    //             "name": "Idadi ya wanaojua hali yao ya maambukizi ya VVU",
    //             "id": "item6",
    //             "dataElements": [
    //               "FHIFORM0034",
    //               "FHIFORM0035",
    //               "FHIFORM0032",
    //               "FHIFORM0033"
    //             ]
    //           },
    //           {
    //             "name": "Idadi ya watu wanaoishi na mgonjwa wa TB (DR-TB) ya mapafu waliofuatiliwa",
    //             "id": "item7",
    //             "dataElements": [
    //               "FHIFORM0026",
    //               "FHIFORM0027",
    //               "FHIFORM0024",
    //               "FHIFORM0025"
    //             ]
    //           },
    //           {
    //             "name": "Idaidi ya wagonjwa walioanza matibabu ya TB",
    //             "id": "item8",
    //             "dataElements": [
    //               "FHIFORM0019",
    //               "FHIFORM0020",
    //               "FHIFORM0017",
    //               "FHIFORM0018"
    //             ]
    //           }
    //         ]
    //       },
    //       {
    //         "categories": [
    //           "default"
    //         ],
    //         "id": "df8b6d7c",
    //         "name": "Ufuatiliaji waliocha/wasionza matibabu ya TB (Treatment defaulter tracing)",
    //         "items": [
    //           {
    //             "name": "Idadi ya wagonjwa walioanza/waliorudi kwenye Tiba",
    //             "id": "item10",
    //             "dataElements": [
    //               "FHIFORM0021"
    //             ]
    //           },
    //           {
    //             "name": "Idadi ya wateja ambao hawakupatikana",
    //             "id": "item11",
    //             "dataElements": [
    //               "FHIFORM0022"
    //             ]
    //           }
    //         ],
    //         "dataElelments": []
    //       }
    //     ]
    //   },
    //   {
    //     "name": "COME Monthly Summary Form",
    //     "id": "df7c7d9e",
    //     "datasetId": "OqwPs1MHQ5T",
    //     "periodType": "Monthly",
    //     "sections": [
    //       {
    //         "categories": [
    //           "df8b6fc0",
    //           "df8b6cz5"
    //         ],
    //         "id": "df8b6ccd",
    //         "name": "",
    //         "items": [
    //           {
    //             "name": "Number of Responded Reached by COME in the Small Groups",
    //             "id": "item1",
    //             "dataElements": [
    //               "zutq0kh8aVx",
    //               "Z1U4YHRkBXV",
    //               "qIMrRZC3Vzz",
    //               "zatWEHRKAGS",
    //               "jC6mQvRP5Bm",
    //               "T02I8sYFm2f",
    //               "X7eDYKZgtsV",
    //               "TxPXFkKtxzj"
    //             ]
    //           }
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     "name": "Taarifa ya Mwezi ya Ukatili wa Kijinsia na Ukatili dhidi ya Watoto(GBV)",
    //     "id": "d7cd43e",
    //     "datasetId": "nRaZyecf0eZ",
    //     "periodType": "Monthly",
    //     "sections": [
    //       {
    //         "categories": [
    //           "ageGBV"
    //         ],
    //         "id": "df8b6ccd",
    //         "name": "",
    //         "items": [
    //           {
    //             "name": "Idadi ya wateja wote KE ",
    //             "id": "item1",
    //             "dataElements": [
    //               "doQvBrstXM1",
    //               "e7uIpyygnon",
    //               "cceJesVDeis",
    //               "FJMbrp1SHMB",
    //               "OWLsRKhCeRh",
    //               "hnuuMemmsaA"
    //             ]
    //           },
    //           {
    //             "name": "Idadi ya wateja wote ME",
    //             "id": "item1",
    //             "dataElements": [
    //               "x2j8cMm8iXJ",
    //               "rrSqYO5RQ0W",
    //               "IIw8ZYpk0IA",
    //               "km2cGaCUghS",
    //               "gWPmBHm6BS2",
    //               "D7nunrhWOci"
    //             ]
    //           },
    //           {
    //             "name": "Idadi ya wateja wapya KE",
    //             "id": "item1",
    //             "dataElements": [
    //               "cpzSRJUgwsA",
    //               "cffYzLugZds",
    //               "t1AmXyJ6eQn",
    //               "uafEPzzPiNW",
    //               "j1gnTDRHbet",
    //               "d8mNTyjLxgI"
    //             ]
    //           },
    //           {
    //             "name": "Idadi ya wateja wapya ME",
    //             "id": "item1",
    //             "dataElements": [
    //               "CfjlVAHd7pn",
    //               "LwjAKK8PAZJ",
    //               "v9zCmJnVmVJ",
    //               "whHHJb03MmX",
    //               "Z1piGwHO9St",
    //               "nDoJoURiZYj"
    //             ]
    //           },
    //           {
    //             "name": "Idadi ya wateja waliokuja kwa ufuatiliaji (Follow up visit) KE",
    //             "id": "item1",
    //             "dataElements": [
    //               "tEAFTL9RLQr",
    //               "UO5yiZbRTDK",
    //               "uuZvMH809Do",
    //               "JJ3UbfF0YeW",
    //               "CBlDGHVsF1T",
    //               "bxpYmAeAucQ"
    //             ]
    //           },
    //           {
    //             "name": "Idadi ya wateja waliokuja kwa ufuatiliaji (Follow up visit) ME",
    //             "id": "item1",
    //             "dataElements": [
    //               "XKRzwB4cDye",
    //               "tS1HuoUc0Oq",
    //               "LDG6i8uEjWQ",
    //               "F8xI5y7Gsj7",
    //               "Nd5FOaNtn65",
    //               "WeIF01oAz4D"
    //             ]
    //           },
    //           {
    //             "name": "Idadi ya watoto waliopo katika mazingira hatarishi KE",
    //             "id": "item1",
    //             "dataElements": [
    //               "JelDNGygYms",
    //               "xa75leXpr2L",
    //               "XXScUExcshv",
    //               "Zmtr7OFn8iX",
    //               "ODQeie21vOq",
    //               "v4ZeZVWm6FM"
    //             ]
    //           },
    //           {
    //             "name": "Idadi ya watoto waliopo katika mazingira hatarishi ME",
    //             "id": "item1",
    //             "dataElements": [
    //               "nB9PE7hXENw",
    //               "pIEhsPfScFT",
    //               "AmthRQFMIV4",
    //               "EBdVeSNKR5e",
    //               "khvTHS6bfA9",
    //               "XtQ2U9ff09M"
    //             ]
    //           },
    //           {
    //             "name": "Walioulizwa maswali ya utambuzi (Screening) KE",
    //             "id": "item1",
    //             "dataElements": [
    //               "XYdY5cMUQVW",
    //               "VqfQoMtXAXi",
    //               "oaE9iVpKDJr",
    //               "dVFPKRJcxKn",
    //               "XNTWWKxoQUN",
    //               "fnte3pJbXx3"
    //             ]
    //           },
    //           {
    //             "name": "Walioulizwa maswali ya utambuzi (Screening) ME",
    //             "id": "item1",
    //             "dataElements": [
    //               "sxR8JCOp1ho",
    //               "kkg6keZMjyl",
    //               "UooiYWncyLR",
    //               "VAEwlKGpUfD",
    //               "vMfcSosi5rc",
    //               "wHnJy1WE308"
    //             ]
    //           },
    //           {
    //             "name": "Wazazi/walezi walioulizwa maswali ya utambuzi kwa niaba ya watoto (Screening) ME",
    //             "id": "item1",
    //             "dataElements": [
    //               "RZ1AdkI4s7j",
    //               "zthvLgB0sam",
    //               "ioOvhh2B2sT",
    //               "BIz45ixiDSb",
    //               "sRUGs5JCyDM",
    //               "MDHNe0CdM2H"
    //             ]
    //           },
    //           {
    //             "name": "Wazazi/walezi walioulizwa maswali ya utambuzi kwa niaba ya watoto (Screening) KE",
    //             "id": "item1",
    //             "dataElements": [
    //               "J2Yij0v10R6",
    //               "xHkFbZUT8GM",
    //               "AeF79q3PGbr",
    //               "Z1vSBUvepq1",
    //               "QQH9jljHZcf",
    //               "s4W4UOsyyqV"
    //             ]
    //           },
    //           {
    //             "name": "Idadi ya waliopatwa na ukatili wa kimwili (Physical Violence) KE",
    //             "id": "item1",
    //             "dataElements": [
    //               "FTebtMP9ohQ",
    //               "GwhkZb9gvW4",
    //               "AHLydbu8iBH",
    //               "q08vutcJkfE",
    //               "dsISkCYTAWv",
    //               "p0zyCefs8xX"
    //             ]
    //           },
    //           {
    //             "name": "Idadi ya waliopatwa na ukatili wa kimwili (Physical Violence) ME",
    //             "id": "item1",
    //             "dataElements": [
    //               "gnawqtmO3yF",
    //               "sFPlCoeH1xB",
    //               "olY58btIcrh",
    //               "T8SdROKNDKv",
    //               "FCuOpKiRUu1",
    //               "sCPc7AcBUxQ"
    //             ]
    //           },
    //           {
    //             "name": "Idadi ya waliopatwa na ukatili wa kingono  wa kubakwa au kulawitiwa (Sexual Violence) KE",
    //             "id": "item1",
    //             "dataElements": [
    //               "i8TFOfVtIDB",
    //               "pqvSmv7EmgG",
    //               "hi1VRP2b1Be",
    //               "ecxTqsr1jah",
    //               "nE7ASIJStlY",
    //               "y831A8CQyu8"
    //             ]
    //           },
    //           {
    //             "name": "Wateja waliopata rufaa kuja kituoni (referral in) ME",
    //             "id": "item1",
    //             "dataElements": [
    //               "cIvqfHafizh",
    //               "P4iLi5Rq18v",
    //               "wvqBPYQs35A",
    //               "gI9YWipgYyb",
    //               "eAeBNMhTyRI",
    //               "i0nh3GcL2K6"
    //             ]
    //           },
    //           {
    //             "name": "Wateja waliopata rufaa ndani ya kituo (Internal referral) KE",
    //             "id": "item1",
    //             "dataElements": [
    //               "PT36LFbcwJ9",
    //               "dW3aizxcksu",
    //               "Hi7vFb1zQaF",
    //               "MCQg6PsMdbw",
    //               "NtNxUjNlphs",
    //               "B6PA97gfEqi"
    //             ]
    //           },
    //           {
    //             "name": "Wateja waliopata rufaa ndani ya kituo (Internal referral) ME",
    //             "id": "item1",
    //             "dataElements": [
    //               "iLdHxNG60Y7",
    //               "Xz6RMoSSjoE",
    //               "ZRqhH1l82fs",
    //               "UCkEPsSenAN",
    //               "K3IwUjtKk0F",
    //               "TZSEjkOPwc1"
    //             ]
    //           },
    //           {
    //             "name": "Wateja waliopata rufaa kwenda nje ya kituo (referral out)KE",
    //             "id": "item1",
    //             "dataElements": [
    //               "tEpe4i4l22J",
    //               "d17nfNI2coN",
    //               "wuWc1QqiwvR",
    //               "bZzakCYN5jy",
    //               "LkoZIUlJ6AW",
    //               "AGTSusxWfP6"
    //             ]
    //           },
    //           {
    //             "name": "Wateja waliopata rufaa kwenda nje ya kituo (referral out) ME",
    //             "id": "item1",
    //             "dataElements": [
    //               "qDU3LhnJqB4",
    //               "WJJC1wGqupJ",
    //               "aeEwVgwePRj",
    //               "pJQAFHkHTrq",
    //               "FrxVAXHK0TY",
    //               "nRqV91nF9gG"
    //             ]
    //           }
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     "name": "Fomu ya Kukusanya Taarifa Vikundi Vya SILC",
    //     "id": "3f754d90",
    //     "datasetId": "FwE72ulXEJs",
    //     "periodType": "Monthly",
    //     "sections": [
    //       {
    //         "categories": [
    //           "default"
    //         ],
    //         "id": "section1",
    //         "name": "",
    //         "items": [
    //           {
    //             "name": "Idadi ya wanachama kikundi kilipoanzishwa",
    //             "id": "item1",
    //             "dataElements": [
    //               "kGkwHcZBtYM"
    //             ]
    //           },
    //           {
    //             "name": "Idadi ya wanachama waliojitoa tangu kuanza kwa mzunguko huu",
    //             "id": "item2",
    //             "dataElements": [
    //               "KiC6PEws9ie"
    //             ]
    //           },
    //           {
    //             "name": "Idadi ya Wanachama waliojiunga na community health fund (CHF)",
    //             "id": "item3",
    //             "dataElements": [
    //               "cVdTI331R3k"
    //             ]
    //           }
    //         ]
    //       },
    //       {
    //         "categories": [
    //           "df8b6fc0"
    //         ],
    //         "id": "df8b6332",
    //         "name": "",
    //         "items": [
    //           {
    //             "name": "Idadi ya wananchama hai",
    //             "id": "item1",
    //             "dataElements": [
    //               "grKObEBaxD3",
    //               "gFJSElylIIV"
    //             ]
    //           },
    //           {
    //             "name": "Idadi ya wananchama hai WAIVU",
    //             "id": "item2",
    //             "dataElements": [
    //               "rN38iXL8ku2",
    //               "UQHT08ANBFH"
    //             ]
    //           }
    //         ]
    //       },
    //       {
    //         "categories": [
    //           "default"
    //         ],
    //         "id": "df8b6ssd",
    //         "name": "",
    //         "items": [
    //           {
    //             "name": "Idadi ya wanachama hai wajawazito",
    //             "id": "item1",
    //             "dataElements": [
    //               "MSoy5VB6Hg2"
    //             ]
    //           },
    //           {
    //             "name": "Idadi ya wanachama hai Wanaonyonyesha",
    //             "id": "item2",
    //             "dataElements": [
    //               "WHvK0PPjrrd"
    //             ]
    //           },
    //           {
    //             "name": "Idadi ya wanachama hai WAVIU wajawazito",
    //             "id": "item3",
    //             "dataElements": [
    //               "VDluRijTqHd"
    //             ]
    //           },
    //           {
    //             "name": "Idadi ya wanachama hai WAVIU Wanaonyonyesha",
    //             "id": "item4",
    //             "dataElements": [
    //               "jkNbaQAVtX2"
    //             ]
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // ],
    //   "categories": [
    //   {
    //     "id": "df8b6fc0",
    //     "name": "Gender",
    //     "items": [
    //       {
    //         "id": "Male",
    //         "name": "Male"
    //       },
    //       {
    //         "id": "Female",
    //         "name": "Female"
    //       }
    //     ]
    //   },
    //   {
    //     "id": "df8b6fc1",
    //     "name": "Age Malaria",
    //     "items": [
    //       {
    //         "id": "0to5",
    //         "name": "0-5"
    //       },
    //       {
    //         "id": "5above",
    //         "name": "5 and Above"
    //       }
    //     ]
    //   },
    //   {
    //     "id": "df8b6c3c",
    //     "name": "Ages",
    //     "items": [
    //       {
    //         "id": "0to14",
    //         "name": "0-14"
    //       },
    //       {
    //         "id": "15above",
    //         "name": "15 na zaidi"
    //       }
    //     ]
    //   },
    //   {
    //     "id": "df8b6cz5",
    //     "name": "Ages COME",
    //     "items": [
    //       {
    //         "id": "10to14",
    //         "name": "10-14"
    //       },
    //       {
    //         "id": "15to17",
    //         "name": "15-17"
    //       },
    //       {
    //         "id": "18to24",
    //         "name": "18-24"
    //       },
    //       {
    //         "id": "25above",
    //         "name": "25 and Above"
    //       }
    //     ]
    //   },
    //   {
    //     "id": "ageGBV",
    //     "name": "Ages GBV",
    //     "items": [
    //       {
    //         "id": "0to59",
    //         "name": "Miezi 0 ? 59"
    //       },
    //       {
    //         "id": "5to9",
    //         "name": "Miaka 5 - 9"
    //       },
    //       {
    //         "id": "10to14",
    //         "name": "Miaka 10 - 14"
    //       },
    //       {
    //         "id": "15to19",
    //         "name": "Miaka 15 - 19"
    //       },
    //       {
    //         "id": "20to24",
    //         "name": "Miaka 20 - 24"
    //       },
    //       {
    //         "id": "25above",
    //         "name": "25 na zaidi"
    //       }
    //     ]
    //   },
    //   {
    //     "id": "df8b626e",
    //     "name": "Referel Types",
    //     "items": [
    //       {
    //         "id": "HIV",
    //         "name": "HIV counselling &amp; Testing"
    //       },
    //       {
    //         "id": "TB",
    //         "name": "Presumptive TB cases"
    //       },
    //       {
    //         "id": "STI",
    //         "name": "STI"
    //       },
    //       {
    //         "id": "FP",
    //         "name": "FP"
    //       },
    //       {
    //         "id": "GBV",
    //         "name": "post GBV/VAC Care"
    //       },
    //       {
    //         "id": "OVC",
    //         "name": "OVC"
    //       },
    //       {
    //         "id": "SocialWelfare",
    //         "name": "Social Welfare"
    //       },
    //       {
    //         "id": "Genderdesk",
    //         "name": "Gender desk and Paralegal services"
    //       },
    //       {
    //         "id": "Malaia5",
    //         "name": "Malaria Below 5 yrs"
    //       },
    //       {
    //         "id": "Malaria5Above",
    //         "name": "Malaria Above 5 yrs"
    //       }
    //     ]
    //   },
    //   {
    //     "id": "default",
    //     "name": "Default",
    //     "items": [
    //       {
    //         "id": "default1",
    //         "name": "Default"
    //       }
    //     ]
    //   },
    //   {
    //     "id": "hsgfosh79",
    //     "name": "SILC Week",
    //     "items": [
    //       {
    //         "id": "week1",
    //         "name": "Wiki 1"
    //       },
    //       {
    //         "id": "week2",
    //         "name": "Wiki 2"
    //       },
    //       {
    //         "id": "week3",
    //         "name": "Wiki 3"
    //       },
    //       {
    //         "id": "week4",
    //         "name": "Wiki 4"
    //       }
    //     ]
    //   }
    // ],
    //   "dataElements": [
    //   {
    //     "id": "FHIFORM0021",
    //     "name": "Idadi ya wagonjwa walioanza/waliorudi kwenye Tiba",
    //     "categories": [
    //       "default"
    //     ],
    //     "categoriesItems": [
    //       "default1"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0030",
    //     "name": "Idadi ya wagonjwa waliogundulika kutoka familia zenye wagonjwa wa TB, DR-TB ya mapafu wakati wa ufuatiliaji Wanaume, 0-14",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Male",
    //       "0to14"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0031",
    //     "name": "Idadi ya wagonjwa waliogundulika kutoka familia zenye wagonjwa wa TB, DR-TB ya mapafu wakati wa ufuatiliaji Wanaume, 15 na zaidi",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Male",
    //       "15above"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0028",
    //     "name": "Idadi ya wagonjwa waliogundulika kutoka familia zenye wagonjwa wa TB, DR-TB ya mapafu wakati wa ufuatiliaji Wanawake, 0-14",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Female",
    //       "0to14"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0029",
    //     "name": "Idadi ya wagonjwa waliogundulika kutoka familia zenye wagonjwa wa TB, DR-TB ya mapafu wakati wa ufuatiliaji Wanawake, 15 na zaidi",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Female",
    //       "15above"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0015",
    //     "name": "Idadi ya wagonjwa wanaohisiwa kuwa na TB/DR-TB na waliopewa rufaa Wanaume, 0-14",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Male",
    //       "0to14"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0016",
    //     "name": "Idadi ya wagonjwa wanaohisiwa kuwa na TB/DR-TB na waliopewa rufaa Wanaume, 15 na zaidi",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Male",
    //       "15above"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0013",
    //     "name": "Idadi ya wagonjwa wanaohisiwa kuwa na TB/DR-TB na waliopewa rufaa Wanawake, 0-14",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Female",
    //       "0to14"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0014",
    //     "name": "Idadi ya wagonjwa wanaohisiwa kuwa na TB/DR-TB na waliopewa rufaa  Wanawake, 15 na zaidi",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Female",
    //       "15above"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0007",
    //     "name": "Idadi ya wagonjwa wanaohisiwa kuwa na TB/DR-TB Wanaume, 0-14",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Male",
    //       "0to14"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0008",
    //     "name": "Idadi ya wagonjwa wanaohisiwa kuwa na TB/DR-TB Wanaume, 15 na zaidi",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Male",
    //       "15above"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0005",
    //     "name": "Idadi ya wagonjwa wanaohisiwa kuwa na TB/DR-TB Wanawake, 0-14",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Female",
    //       "0to14"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0006",
    //     "name": "Idadi ya wagonjwa wanaohisiwa kuwa na TB/DR-TB Wanawake, 15 na zaidi",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Female",
    //       "15above"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0011",
    //     "name": "Idadi ya wahisiwa waliopatikana na TB/DR-TB Wanaume, 0-14",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Male",
    //       "0to14"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0012",
    //     "name": "Idadi ya wahisiwa waliopatikana na TB/DR-TB Wanaume, 15 na zaidi",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Male",
    //       "15above"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0009",
    //     "name": "Idadi ya wahisiwa waliopatikana na TB/DR-TB Wanawake, 0-14",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Female",
    //       "0to14"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0010",
    //     "name": "Idadi ya wahisiwa waliopatikana na TB/DR-TB Wanawake, 15 na zaidi",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Female",
    //       "15above"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0003",
    //     "name": "Idadi ya waliochunguzwa  TB (Jumla ya walioko katika fomu namba TB12) Wanaume, 0-14",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Male",
    //       "0to14"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0004",
    //     "name": "Idadi ya waliochunguzwa  TB (Jumla ya walioko katika fomu namba TB12) Wanaume, 15 na zaidi",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Male",
    //       "15above"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0001",
    //     "name": "Idadi ya waliochunguzwa  TB (Jumla ya walioko katika fomu namba TB12) Wanawake, 0-14",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Female",
    //       "0to14"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0002",
    //     "name": "Idadi ya waliochunguzwa  TB (Jumla ya walioko katika fomu namba TB12) Wanawake, 15 na zaidi",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Female",
    //       "15above"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0034",
    //     "name": "Idadi ya wanaojua hali yao ya maambukizi ya VVU Wanaume, 0-14",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Male",
    //       "0to14"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0035",
    //     "name": "Idadi ya wanaojua hali yao ya maambukizi ya VVU Wanaume, 15 na zaidi",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Male",
    //       "15above"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0032",
    //     "name": "Idadi ya wanaojua hali yao ya maambukizi ya VVU Wanawake, 0-14",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Female",
    //       "0to14"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0033",
    //     "name": "Idadi ya wanaojua hali yao ya maambukizi ya VVU Wanawake, 15 na zaidi",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Female",
    //       "15above"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0022",
    //     "name": "Idadi ya wateja ambao hawakupatikana",
    //     "categories": [
    //       "default"
    //     ],
    //     "categoriesItems": [
    //       "default1"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0026",
    //     "name": "Idadi ya watu wanaoishi na mgonjwa wa TB (DR-TB) ya mapafu waliofuatiliwa Wanaume, 0-14",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Male",
    //       "0to14"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0027",
    //     "name": "Idadi ya watu wanaoishi na mgonjwa wa TB (DR-TB) ya mapafu waliofuatiliwa Wanaume, 15 na zaidi",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Male",
    //       "15above"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0024",
    //     "name": "Idadi ya watu wanaoishi na mgonjwa wa TB (DR-TB) ya mapafu waliofuatiliwa Wanawake, 0-14",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Female",
    //       "0to14"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0025",
    //     "name": "Idadi ya watu wanaoishi na mgonjwa wa TB (DR-TB) ya mapafu waliofuatiliwa Wanawake, 15 na zaidi",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Female",
    //       "15above"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0019",
    //     "name": "Idaidi ya wagonjwa walioanza matibabu ya TB Wanaume, 0-14",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Male",
    //       "0to14"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0020",
    //     "name": "Idaidi ya wagonjwa walioanza matibabu ya TB Wanaume, 15 na zaidi",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Male",
    //       "15above"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0017",
    //     "name": "Idaidi ya wagonjwa walioanza matibabu ya TB  Wanawake, 0-14",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Female",
    //       "0to14"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0018",
    //     "name": "Idaidi ya wagonjwa walioanza matibabu ya TB Wanawake, 15 na zaidi",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6c3c"
    //     ],
    //     "categoriesItems": [
    //       "Female",
    //       "15above"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0071",
    //     "name": "Number of TB referrals successfully completed TB RX/cured",
    //     "categories": [
    //       "default"
    //     ],
    //     "categoriesItems": [
    //       "default1"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0070",
    //     "name": "Number of successful TB referrals who were found to have TB, started anti-TB treatment",
    //     "categories": [
    //       "default"
    //     ],
    //     "categoriesItems": [
    //       "default1"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0069",
    //     "name": "Number of clients who tested HIV positive initiated on ART",
    //     "categories": [
    //       "default"
    //     ],
    //     "categoriesItems": [
    //       "default1"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0068",
    //     "name": "Number of failed referrals malaria Above 5 yrs",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "Malaria5Above"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0067",
    //     "name": "Number of failed referrals malaria Under 5 yrs",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "Malaia5"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0066",
    //     "name": "Number of failed referrals Gender desk and Paralegal services",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "Genderdesk"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0065",
    //     "name": "Number of failed referrals Social Welfare",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "SocialWelfare"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0064",
    //     "name": "Number of failed referrals OVC",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "OVC"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0063",
    //     "name": "Number of failed referrals post GBV/VAC Care",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "GBV"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0062",
    //     "name": "Number of failed referrals FP",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "FP"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0060",
    //     "name": "Number of failed referrals STI",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "STI"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0059",
    //     "name": "Number of failed referrals Presumptive TB cases",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "TB"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0058",
    //     "name": "Number of failed referrals HIV counselling & Testing",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "HIV"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0057",
    //     "name": "Number of successful referrals malaria Above 5 yrs",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "Malaria5Above"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0056",
    //     "name": "Number of successful referrals malaria Under 5 yrs",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "Malaia5"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0055",
    //     "name": "Number of successful referrals Gender desk and Paralegal services",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "Genderdesk"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0054",
    //     "name": "Number of successful referrals Social Welfare",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "SocialWelfare"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0053",
    //     "name": "Number of successful referrals OVC",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "OVC"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0052",
    //     "name": "Number of successful referrals post GBV/VAC Care",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "GBV"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0051",
    //     "name": "Number of successful referrals FP",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "FP"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0049",
    //     "name": "Number of successful referrals STI",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "STI"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0048",
    //     "name": "Number of successful referrals Presumptive TB cases",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "TB"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0047",
    //     "name": "Number of successful referrals HIV counselling & Testing",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "HIV"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0046",
    //     "name": "Number of referral initiated malaria Above 5 yrs",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "Malaria5Above"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0045",
    //     "name": "Number of referral initiated malaria Under 5 yrs",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "Malaia5"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0044",
    //     "name": "Number of referral initiated Gender desk and Paralegal services",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "Genderdesk"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0043",
    //     "name": "Number of referral initiated Social Welfare",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "SocialWelfare"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0042",
    //     "name": "Number of referral initiated OVC",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "OVC"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0041",
    //     "name": "Number of referral initiated post GBV/VAC Care",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "GBV"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0040",
    //     "name": "Number of referral initiated FP",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "FP"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0038",
    //     "name": "Number of referral initiated STI",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "STI"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0037",
    //     "name": "Number of referral initiated Presumptive TB cases",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "TB"
    //     ]
    //   },
    //   {
    //     "id": "FHIFORM0036",
    //     "name": "Number of referral initiated HIV counselling & Testing",
    //     "categories": [
    //       "df8b626e"
    //     ],
    //     "categoriesItems": [
    //       "HIV"
    //     ]
    //   },
    //   {
    //     "id": "Z1U4YHRkBXV",
    //     "name": "Number of Responded Reached by COME in the Small Groups Male 15 - 17",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6cz5"
    //     ],
    //     "categoriesItems": [
    //       "Male",
    //       "15to17"
    //     ]
    //   },
    //   {
    //     "id": "zatWEHRKAGS",
    //     "name": "Number of Responded Reached by COME in the Small Groups Male 25+",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6cz5"
    //     ],
    //     "categoriesItems": [
    //       "Male",
    //       "25above"
    //     ]
    //   },
    //   {
    //     "id": "qIMrRZC3Vzz",
    //     "name": "Number of Responded Reached by COME in the Small Groups Male 18 - 24",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6cz5"
    //     ],
    //     "categoriesItems": [
    //       "Male",
    //       "18to24"
    //     ]
    //   },
    //   {
    //     "id": "T02I8sYFm2f",
    //     "name": "Number of Responded Reached by COME in the Small Groups Female 15 - 17",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6cz5"
    //     ],
    //     "categoriesItems": [
    //       "Female",
    //       "15to17"
    //     ]
    //   },
    //   {
    //     "id": "TxPXFkKtxzj",
    //     "name": "Number of Responded Reached by COME in the Small Groups Female 25+",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6cz5"
    //     ],
    //     "categoriesItems": [
    //       "Female",
    //       "25above"
    //     ]
    //   },
    //   {
    //     "id": "zutq0kh8aVx",
    //     "name": "Number of Responded Reached by COME in the Small Groups Male 10 -14",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6cz5"
    //     ],
    //     "categoriesItems": [
    //       "Male",
    //       "10to14"
    //     ]
    //   },
    //   {
    //     "id": "X7eDYKZgtsV",
    //     "name": "Number of Responded Reached by COME in the Small Groups Female 18 -24",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6cz5"
    //     ],
    //     "categoriesItems": [
    //       "Female",
    //       "18to24"
    //     ]
    //   },
    //   {
    //     "id": "jC6mQvRP5Bm",
    //     "name": "Number of Responded Reached by COME in the Small Groups Female 10 -14",
    //     "categories": [
    //       "df8b6fc0",
    //       "df8b6cz5"
    //     ],
    //     "categoriesItems": [
    //       "Female",
    //       "10to14"
    //     ]
    //   },
    //   {
    //     "name": "SILC Thamani ya Mikopo iliyofutwa Wiki 1",
    //     "id": "HCNEp5J1qBF",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week1"
    //     ]
    //   },
    //   {
    //     "name": "SILC Wanachama waliohudhuria mkutano leo Wiki 2",
    //     "id": "PfUdQoDCEqh",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week2"
    //     ]
    //   },
    //   {
    //     "name": "SILC Thamani ya Mikopo iliyofutwa Wiki 3",
    //     "id": "NU3CeWmNQrH",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week3"
    //     ]
    //   },
    //   {
    //     "name": "SILC Idadi ya wanachama hai WAVIU wajawazito",
    //     "id": "VDluRijTqHd",
    //     "categories": [
    //       "default"
    //     ],
    //     "categoriesItems": [
    //       "default1"
    //     ]
    //   },
    //   {
    //     "name": "SILC Kiasi cha Fedha zote zilizopo kwenye sanduku na benki Wiki 2",
    //     "id": "epp2TB72jvz",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week2"
    //     ]
    //   },
    //   {
    //     "name": "SILC Idadi ya OVC waliosaidiwa Wanawake Wiki 3",
    //     "id": "VRTSg8NjPzK",
    //     "categories": [
    //       "df8b6fc0",
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "Female",
    //       "week3"
    //     ]
    //   },
    //   {
    //     "name": "SILC Idadi ya mikopo yote iliyotolewa toka mwanzo wa mzunguko hadi leo ambayo haijarejeshwa (ambayo muda wake umepita jumlisha ambayo bado muda haujapita) Wiki 4",
    //     "id": "UMjJbQ025Eg",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week4"
    //     ]
    //   },
    //   {
    //     "name": "SILC Thamani ya mikopo yote ambayo haijareshwa na muda wake wa kurejesha umeshapita Wiki 2",
    //     "id": "Kir3a0pVmYj",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week2"
    //     ]
    //   },
    //   {
    //     "name": "SILC Idadi ya OVC waliosaidiwa Wanaume Wiki 3",
    //     "id": "ULObDpq9oJH",
    //     "categories": [
    //       "df8b6fc0",
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "Male",
    //       "week3"
    //     ]
    //   },
    //   {
    //     "name": "SILC Thamani ya mikopo yote ambayo haijareshwa na muda wake wa kurejesha umeshapita Wiki 1",
    //     "id": "rLNxOZwxzO2",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week1"
    //     ]
    //   },
    //   {
    //     "name": "SILC Thamani ya mali ya kikundi wakati kikundi kinaanza Wiki 1",
    //     "id": "iybszrWqhq5",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week1"
    //     ]
    //   },
    //   {
    //     "name": "SILC Fedha katika mfuko wa watoto Wiki 1",
    //     "id": "UP4Vr8eiZNK",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week1"
    //     ]
    //   },
    //   {
    //     "name": "SILC Idadi ya wanachama hai Wanaonyonyesha",
    //     "id": "WHvK0PPjrrd",
    //     "categories": [
    //       "default"
    //     ],
    //     "categoriesItems": [
    //       "default1"
    //     ]
    //   },
    //   {
    //     "name": "SILC Madeni ya kikundi (ambayo kikundi kinadaiwa) Wiki 4",
    //     "id": "rPoxgVF2AmY",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week4"
    //     ]
    //   },
    //   {
    //     "name": "SILC Wanachama waliohudhuria mkutano leo Wiki 1",
    //     "id": "vgSjxFXbfWK",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week1"
    //     ]
    //   },
    //   {
    //     "name": "SILC Thamani ya Mikopo iliyofutwa Wiki 4",
    //     "id": "GY3i5yf02Rb",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week4"
    //     ]
    //   },
    //   {
    //     "name": "SILC Thamani ya mali ya kikundi kwa sasa Wiki 4",
    //     "id": "sHquLPc3gYx",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week4"
    //     ]
    //   },
    //   {
    //     "name": "SILC Madeni ya kikundi (ambayo kikundi kinadaiwa) Wiki 2",
    //     "id": "psUIRmlJVka",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week2"
    //     ]
    //   },
    //   {
    //     "name": "SILC Thamani ya pesa zote za hisa toka mwanzo hadi leo Wiki 2",
    //     "id": "duu9I3LFZpD",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week2"
    //     ]
    //   },
    //   {
    //     "name": "SILC Idadi ya OVC waliosaidiwa Wanaume Wiki 1",
    //     "id": "XkWKWOYHtow",
    //     "categories": [
    //       "df8b6fc0",
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "Male",
    //       "week1"
    //     ]
    //   },
    //   {
    //     "name": "SILC Idadi ya wanachama kikundi kilipoanzishwa",
    //     "id": "kGkwHcZBtYM",
    //     "categories": [
    //       "default"
    //     ],
    //     "categoriesItems": [
    //       "default1"
    //     ]
    //   },
    //   {
    //     "name": "SILC Madeni ya kikundi (ambayo kikundi kinadaiwa) Wiki 1",
    //     "id": "qNuJ3cTtR2M",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week1"
    //     ]
    //   },
    //   {
    //     "name": "SILC Idadi ya OVC waliosaidiwa Wanawake Wiki 1",
    //     "id": "aNypzZvsAGN",
    //     "categories": [
    //       "df8b6fc0",
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "Female",
    //       "week1"
    //     ]
    //   },
    //   {
    //     "name": "SILC Idadi ya wanachama hai WAVIU Wanawake",
    //     "id": "UQHT08ANBFH",
    //     "categories": [
    //       "df8b6fc0"
    //     ],
    //     "categoriesItems": [
    //       "Female"
    //     ]
    //   },
    //   {
    //     "name": "SILC Thamani ya mikopo yote ambayo haijareshwa na muda wake wa kurejesha umeshapita Wiki 3",
    //     "id": "E086O6A19CY",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week3"
    //     ]
    //   },
    //   {
    //     "name": "SILC Idadi ya OVC waliosaidiwa Wanawake Wiki 4",
    //     "id": "THDbS6vpnET",
    //     "categories": [
    //       "df8b6fc0",
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "Female",
    //       "week4"
    //     ]
    //   },
    //   {
    //     "name": "SILC Thamani ya Mikopo iliyofutwa Wiki 2",
    //     "id": "eqAB6A2QZ2C",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week2"
    //     ]
    //   },
    //   {
    //     "name": "SILC Idadi ya wanachama hai Wanawake",
    //     "id": "gFJSElylIIV",
    //     "categories": [
    //       "df8b6fc0"
    //     ],
    //     "categoriesItems": [
    //       "Female"
    //     ]
    //   },
    //   {
    //     "name": "SILC Thamani ya pesa zote za hisa toka mwanzo hadi leo Wiki 4",
    //     "id": "DE9EZEZjRYK",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week4"
    //     ]
    //   },
    //   {
    //     "name": "SILC Thamani ya mali ya kikundi wakati kikundi kinaanza Wiki 3",
    //     "id": "M1Mwkx8ZuJJ",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week3"
    //     ]
    //   },
    //   {
    //     "name": "SILC Idadi ya OVC waliosaidiwa Wanaume Wiki 4",
    //     "id": "wm6ayHioyyM",
    //     "categories": [
    //       "df8b6fc0",
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "Male",
    //       "week4"
    //     ]
    //   },
    //   {
    //     "name": "SILC Idadi ya wanachama hai WAVIU Wanaume",
    //     "id": "rN38iXL8ku2",
    //     "categories": [
    //       "df8b6fc0"
    //     ],
    //     "categoriesItems": [
    //       "Male"
    //     ]
    //   },
    //   {
    //     "name": "SILC Idadi ya mikopo yote iliyotolewa toka mwanzo wa mzunguko hadi leo ambayo haijarejeshwa (ambayo muda wake umepita jumlisha ambayo bado muda haujapita) Wiki 1",
    //     "id": "NjCSi5ub3Gq",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week1"
    //     ]
    //   },
    //   {
    //     "name": "SILC Thamani ya mali ya kikundi kwa sasa Wiki 1",
    //     "id": "BowUpIU4PWw",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week1"
    //     ]
    //   },
    //   {
    //     "name": "SILC Idadi ya OVC waliosaidiwa Wanaume Wiki 2",
    //     "id": "K3BE7Cq4UW8",
    //     "categories": [
    //       "df8b6fc0",
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "Male",
    //       "week2"
    //     ]
    //   },
    //   {
    //     "name": "SILC Thamani ya mali ya kikundi wakati kikundi kinaanza Wiki 4",
    //     "id": "gug9OWwS7Qu",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week4"
    //     ]
    //   },
    //   {
    //     "name": "SILC Kiasi cha Fedha zote zilizopo kwenye sanduku na benki Wiki 1",
    //     "id": "ZECV3FRq2eo",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week1"
    //     ]
    //   },
    //   {
    //     "name": "SILC Thamani ya pesa zote za hisa toka mwanzo hadi leo Wiki 1",
    //     "id": "LySK9AFlnMi",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week1"
    //     ]
    //   },
    //   {
    //     "name": "SILC Wanachama waliohudhuria mkutano leo Wiki 4",
    //     "id": "lZTNntD1ch3",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week4"
    //     ]
    //   },
    //   {
    //     "name": "SILC Kiasi cha Fedha zote zilizopo kwenye sanduku na benki Wiki 4",
    //     "id": "qOzrDYxYEYc",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week4"
    //     ]
    //   },
    //   {
    //     "name": "SILC Thamani ya mali ya kikundi kwa sasa Wiki 3",
    //     "id": "vJUc3SZdpNI",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week3"
    //     ]
    //   },
    //   {
    //     "name": "SILC Fedha katika Mfuko wa Jamii Wiki 3",
    //     "id": "PDpfgS0OMyq",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week3"
    //     ]
    //   },
    //   {
    //     "name": "SILC Thamani ya mikopo yote ambayo haijareshwa na muda wake wa kurejesha umeshapita Wiki 4",
    //     "id": "eerv34qswC2",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week4"
    //     ]
    //   },
    //   {
    //     "name": "SILC Fedha katika Mfuko wa Jamii Wiki 4",
    //     "id": "T5M2JWlf4H5",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week4"
    //     ]
    //   },
    //   {
    //     "name": "SILC Fedha katika mfuko wa watoto Wiki 3",
    //     "id": "Y8xZeaISRN9",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week3"
    //     ]
    //   },
    //   {
    //     "name": "SILC Thamani ya mali ya kikundi kwa sasa Wiki 2",
    //     "id": "OjBKERrEHNx",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week2"
    //     ]
    //   },
    //   {
    //     "name": "SILC Idadi ya wanachama waliojitoa tangu kuanza kwa mzunguko huu",
    //     "id": "KiC6PEws9ie"
    //   },
    //   {
    //     "name": "SILC Fedha katika mfuko wa watoto Wiki 4",
    //     "id": "VrWs27aM3xd",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week4"
    //     ]
    //   },
    //   {
    //     "name": "SILC Idadi ya wanachama hai Wanaume",
    //     "id": "grKObEBaxD3",
    //     "categories": [
    //       "df8b6fc0"
    //     ],
    //     "categoriesItems": [
    //       "Female"
    //     ]
    //   },
    //   {
    //     "name": "SILC Madeni ya kikundi (ambayo kikundi kinadaiwa) Wiki 3",
    //     "id": "MN9IvhdqeC5",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week3"
    //     ]
    //   },
    //   {
    //     "name": "SILC Fedha katika Mfuko wa Jamii Wiki 2",
    //     "id": "Rf508OeOljA",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week2"
    //     ]
    //   },
    //   {
    //     "name": "SILC Idadi ya OVC waliosaidiwa Wanawake Wiki 2",
    //     "id": "AeUMWiEBtKD",
    //     "categories": [
    //       "df8b6fc0",
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "Female",
    //       "week2"
    //     ]
    //   },
    //   {
    //     "name": "SILC Fedha katika mfuko wa watoto Wiki 2",
    //     "id": "ypOrjQxugOs",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week2"
    //     ]
    //   },
    //   {
    //     "name": "SILC Idadi ya wanachama hai wajawazito",
    //     "id": "MSoy5VB6Hg2",
    //     "categories": [
    //       "default"
    //     ],
    //     "categoriesItems": [
    //       "default1"
    //     ]
    //   },
    //   {
    //     "name": "SILC Idadi ya mikopo yote iliyotolewa toka mwanzo wa mzunguko hadi leo ambayo haijarejeshwa (ambayo muda wake umepita jumlisha ambayo bado muda haujapita) Wiki 2",
    //     "id": "oHfGCLOmwqO",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week2"
    //     ]
    //   },
    //   {
    //     "name": "SILC Idadi ya wanachama hai WAVIU Wanaonyonyesha",
    //     "id": "jkNbaQAVtX2",
    //     "categories": [
    //       "default"
    //     ],
    //     "categoriesItems": [
    //       "default1"
    //     ]
    //   },
    //   {
    //     "name": "SILC Fedha katika Mfuko wa Jamii Wiki 1",
    //     "id": "w2Xczyal9Tp",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week1"
    //     ]
    //   },
    //   {
    //     "name": "SILC Idadi ya Wanachama waliojiunga na community health fund (CHF)",
    //     "id": "cVdTI331R3k",
    //     "categories": [
    //       "default"
    //     ],
    //     "categoriesItems": [
    //       "default1"
    //     ]
    //   },
    //   {
    //     "name": "SILC Kiasi cha Fedha zote zilizopo kwenye sanduku na benki Wiki 3",
    //     "id": "nAHRRoODWeO",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week3"
    //     ]
    //   },
    //   {
    //     "name": "SILC Thamani ya mali ya kikundi wakati kikundi kinaanza Wiki 2",
    //     "id": "oG4wTx7IY5o",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week2"
    //     ]
    //   },
    //   {
    //     "name": "SILC Thamani ya pesa zote za hisa toka mwanzo hadi leo Wiki 3",
    //     "id": "wpLbj9UazMY",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week3"
    //     ]
    //   },
    //   {
    //     "name": "SILC Wanachama waliohudhuria mkutano leo Wiki 3",
    //     "id": "ujo9zoe5cwb",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week3"
    //     ]
    //   },
    //   {
    //     "name": "SILC Idadi ya mikopo yote iliyotolewa toka mwanzo wa mzunguko hadi leo ambayo haijarejeshwa (ambayo muda wake umepita jumlisha ambayo bado muda haujapita) Wiki 3",
    //     "id": "QwAjbtf35CE",
    //     "categories": [
    //       "hsgfosh79"
    //     ],
    //     "categoriesItems": [
    //       "week3"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya waliopatwa na ukatili wa kimwili (Physical Violence) KE  Miaka 10 ? 14",
    //     "id": "AHLydbu8iBH",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "10to14"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya waliopatwa na ukatili wa kimwili (Physical Violence) KE  Miaka 15 ? 19",
    //     "id": "q08vutcJkfE",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "15to19"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya waliopatwa na ukatili wa kimwili (Physical Violence) KE  Miaka 20 ? 24",
    //     "id": "dsISkCYTAWv",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "20to24"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya waliopatwa na ukatili wa kimwili (Physical Violence) KE  Miaka 25 na Zaidi",
    //     "id": "p0zyCefs8xX",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "25above"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya waliopatwa na ukatili wa kimwili (Physical Violence) KE  Miaka 5 ? 9",
    //     "id": "GwhkZb9gvW4",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "5to9"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya waliopatwa na ukatili wa kimwili (Physical Violence) KE  Miezi 0 ? 59",
    //     "id": "FTebtMP9ohQ",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "0to59"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya waliopatwa na ukatili wa kimwili (Physical Violence) ME Miaka 10 ? 14",
    //     "id": "olY58btIcrh",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "10to14"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya waliopatwa na ukatili wa kimwili (Physical Violence) ME Miaka 15 ? 19",
    //     "id": "T8SdROKNDKv",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya waliopatwa na ukatili wa kimwili (Physical Violence) ME Miaka 20 ? 24",
    //     "id": "FCuOpKiRUu1",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "20to24"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya waliopatwa na ukatili wa kimwili (Physical Violence) ME Miaka 25 na Zaidi",
    //     "id": "sCPc7AcBUxQ",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "25above"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya waliopatwa na ukatili wa kimwili (Physical Violence) ME Miaka 5 ? 9",
    //     "id": "sFPlCoeH1xB",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya waliopatwa na ukatili wa kimwili (Physical Violence) ME Miezi 0 ? 59",
    //     "id": "gnawqtmO3yF",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "0to59"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya waliopatwa na ukatili wa kingono  wa kubakwa au kulawitiwa (Sexual Violence) KE Miaka 10 ? 14",
    //     "id": "hi1VRP2b1Be",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "10to14"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya waliopatwa na ukatili wa kingono  wa kubakwa au kulawitiwa (Sexual Violence) KE Miaka 15 ? 19",
    //     "id": "ecxTqsr1jah",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya waliopatwa na ukatili wa kingono  wa kubakwa au kulawitiwa (Sexual Violence) KE Miaka 20 ? 24",
    //     "id": "nE7ASIJStlY",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "20to24"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya waliopatwa na ukatili wa kingono  wa kubakwa au kulawitiwa (Sexual Violence) KE Miaka 25 na Zaidi",
    //     "id": "y831A8CQyu8",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "25above"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya waliopatwa na ukatili wa kingono  wa kubakwa au kulawitiwa (Sexual Violence) KE Miaka 5 ? 9",
    //     "id": "pqvSmv7EmgG",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya waliopatwa na ukatili wa kingono  wa kubakwa au kulawitiwa (Sexual Violence) KE Miezi 0 ? 59",
    //     "id": "i8TFOfVtIDB",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "0to59"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja waliokuja kwa ufuatiliaji (Follow up visit) KE  Miaka 10 ? 14",
    //     "id": "uuZvMH809Do",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "10to14"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja waliokuja kwa ufuatiliaji (Follow up visit) KE  Miaka 15 ? 19",
    //     "id": "JJ3UbfF0YeW",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja waliokuja kwa ufuatiliaji (Follow up visit) KE  Miaka 20 ? 24",
    //     "id": "CBlDGHVsF1T",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "20to24"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja waliokuja kwa ufuatiliaji (Follow up visit) KE  Miaka 25 na Zaidi",
    //     "id": "bxpYmAeAucQ",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "25above"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja waliokuja kwa ufuatiliaji (Follow up visit) KE  Miaka 5 ? 9",
    //     "id": "UO5yiZbRTDK",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "5to9"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja waliokuja kwa ufuatiliaji (Follow up visit) KE  Miezi 0 ? 59",
    //     "id": "tEAFTL9RLQr",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "0to59"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja waliokuja kwa ufuatiliaji (Follow up visit) ME  Miaka 10 ? 14",
    //     "id": "LDG6i8uEjWQ"
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja waliokuja kwa ufuatiliaji (Follow up visit) ME  Miaka 15 ? 19",
    //     "id": "F8xI5y7Gsj7",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "10to14"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja waliokuja kwa ufuatiliaji (Follow up visit) ME  Miaka 20 ? 24",
    //     "id": "Nd5FOaNtn65",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "20to24"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja waliokuja kwa ufuatiliaji (Follow up visit) ME  Miaka 25 na Zaidi",
    //     "id": "WeIF01oAz4D",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "25above"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja waliokuja kwa ufuatiliaji (Follow up visit) ME  Miaka 5 ? 9",
    //     "id": "tS1HuoUc0Oq",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "5to9"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja waliokuja kwa ufuatiliaji (Follow up visit) ME  Miezi 0 ? 59",
    //     "id": "XKRzwB4cDye",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "0to59"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja wapya KE Miaka 10 ? 14",
    //     "id": "t1AmXyJ6eQn",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "10to14"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja wapya KE Miaka 15 ? 19",
    //     "id": "uafEPzzPiNW",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja wapya KE Miaka 20 ? 24",
    //     "id": "j1gnTDRHbet",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "20to24"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja wapya KE Miaka 25 na Zaidi",
    //     "id": "d8mNTyjLxgI",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "25above"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja wapya KE Miaka 5 ? 9",
    //     "id": "cffYzLugZds",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja wapya KE Miezi 0 ? 59",
    //     "id": "cpzSRJUgwsA",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "0to59"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja wapya ME  Miaka 10 ? 14",
    //     "id": "v9zCmJnVmVJ",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "10to14"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja wapya ME  Miaka 15 ? 19",
    //     "id": "whHHJb03MmX",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja wapya ME  Miaka 20 ? 24",
    //     "id": "Z1piGwHO9St",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "20to24"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja wapya ME  Miaka 25 na Zaidi",
    //     "id": "nDoJoURiZYj",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "25above"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja wapya ME  Miaka 5 ? 9",
    //     "id": "LwjAKK8PAZJ",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "5to9"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja wapya ME  Miezi 0 ? 59",
    //     "id": "CfjlVAHd7pn",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "0to59"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja wote KE  Miaka 10 ? 14",
    //     "id": "cceJesVDeis",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "10to14"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja wote KE  Miaka 15 ? 19",
    //     "id": "FJMbrp1SHMB",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja wote KE  Miaka 20 ? 24",
    //     "id": "OWLsRKhCeRh",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "20to24"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja wote KE  Miaka 25 na Zaidi",
    //     "id": "hnuuMemmsaA",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "25above"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja wote KE  Miaka 5 ? 9",
    //     "id": "e7uIpyygnon",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "5to9"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja wote KE  Miezi 0 ? 59",
    //     "id": "doQvBrstXM1",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "0to59"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja wote ME  Miaka 10 ? 14",
    //     "id": "IIw8ZYpk0IA",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "10to14"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja wote ME  Miaka 15 ? 19",
    //     "id": "km2cGaCUghS",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja wote ME  Miaka 20 ? 24",
    //     "id": "gWPmBHm6BS2",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "20to24"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja wote ME  Miaka 25 na Zaidi",
    //     "id": "D7nunrhWOci",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "25above"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja wote ME  Miaka 5 ? 9",
    //     "id": "rrSqYO5RQ0W",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "5to9"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya wateja wote ME  Miezi 0 ? 59",
    //     "id": "x2j8cMm8iXJ",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "0to59"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya watoto waliopo katika mazingira hatarishi KE  Miaka 10 ? 14",
    //     "id": "XXScUExcshv",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "10to14"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya watoto waliopo katika mazingira hatarishi KE  Miaka 15 ? 19",
    //     "id": "Zmtr7OFn8iX",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya watoto waliopo katika mazingira hatarishi KE  Miaka 20 ? 24",
    //     "id": "ODQeie21vOq",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "20to24"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya watoto waliopo katika mazingira hatarishi KE  Miaka 25 na Zaidi",
    //     "id": "v4ZeZVWm6FM",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "25above"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya watoto waliopo katika mazingira hatarishi KE  Miaka 5 ? 9",
    //     "id": "xa75leXpr2L",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "5to9"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya watoto waliopo katika mazingira hatarishi KE  Miezi 0 ? 59",
    //     "id": "JelDNGygYms",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "0to59"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya watoto waliopo katika mazingira hatarishi ME  Miaka 10 ? 14",
    //     "id": "AmthRQFMIV4",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "10to14"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya watoto waliopo katika mazingira hatarishi ME  Miaka 15 ? 19",
    //     "id": "EBdVeSNKR5e",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya watoto waliopo katika mazingira hatarishi ME  Miaka 20 ? 24",
    //     "id": "khvTHS6bfA9",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "20to24"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya watoto waliopo katika mazingira hatarishi ME  Miaka 25 na Zaidi",
    //     "id": "XtQ2U9ff09M",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "25above"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya watoto waliopo katika mazingira hatarishi ME  Miaka 5 ? 9",
    //     "id": "pIEhsPfScFT",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "5to9"
    //     ]
    //   },
    //   {
    //     "name": "GBV Idadi ya watoto waliopo katika mazingira hatarishi ME  Miezi 0 ? 59",
    //     "id": "nB9PE7hXENw",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "0to59"
    //     ]
    //   },
    //   {
    //     "name": "GBV Walioulizwa maswali ya utambuzi (Screening) KE Miaka 10 ? 14",
    //     "id": "oaE9iVpKDJr",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "10to14"
    //     ]
    //   },
    //   {
    //     "name": "GBV Walioulizwa maswali ya utambuzi (Screening) KE Miaka 15 ? 19",
    //     "id": "dVFPKRJcxKn",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Walioulizwa maswali ya utambuzi (Screening) KE Miaka 20 ? 24",
    //     "id": "XNTWWKxoQUN",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "20to24"
    //     ]
    //   },
    //   {
    //     "name": "GBV Walioulizwa maswali ya utambuzi (Screening) KE Miaka 25 na Zaidi",
    //     "id": "fnte3pJbXx3",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "25above"
    //     ]
    //   },
    //   {
    //     "name": "GBV Walioulizwa maswali ya utambuzi (Screening) KE Miaka 5 ? 9",
    //     "id": "VqfQoMtXAXi",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Walioulizwa maswali ya utambuzi (Screening) KE Miezi 0 ? 59",
    //     "id": "XYdY5cMUQVW",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "0to59"
    //     ]
    //   },
    //   {
    //     "name": "GBV Walioulizwa maswali ya utambuzi (Screening) ME  Miaka 10 ? 14",
    //     "id": "UooiYWncyLR",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "10to14"
    //     ]
    //   },
    //   {
    //     "name": "GBV Walioulizwa maswali ya utambuzi (Screening) ME  Miaka 15 ? 19",
    //     "id": "VAEwlKGpUfD",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Walioulizwa maswali ya utambuzi (Screening) ME  Miaka 20 ? 24",
    //     "id": "vMfcSosi5rc",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "20to24"
    //     ]
    //   },
    //   {
    //     "name": "GBV Walioulizwa maswali ya utambuzi (Screening) ME  Miaka 25 na Zaidi",
    //     "id": "wHnJy1WE308",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "25above"
    //     ]
    //   },
    //   {
    //     "name": "GBV Walioulizwa maswali ya utambuzi (Screening) ME  Miaka 5 ? 9",
    //     "id": "kkg6keZMjyl",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "5to9"
    //     ]
    //   },
    //   {
    //     "name": "GBV Walioulizwa maswali ya utambuzi (Screening) ME  Miezi 0 ? 59",
    //     "id": "sxR8JCOp1ho",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "0to59"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa kuja kituoni (referral in) ME Miaka 10 ? 14",
    //     "id": "wvqBPYQs35A",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "10to14"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa kuja kituoni (referral in) ME Miaka 15 ? 19",
    //     "id": "gI9YWipgYyb",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa kuja kituoni (referral in) ME Miaka 20 ? 24",
    //     "id": "eAeBNMhTyRI",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa kuja kituoni (referral in) ME Miaka 25 na Zaidi",
    //     "id": "i0nh3GcL2K6",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "25above"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa kuja kituoni (referral in) ME Miaka 5 ? 9",
    //     "id": "P4iLi5Rq18v",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa kuja kituoni (referral in) ME Miezi 0 ? 59",
    //     "id": "cIvqfHafizh",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "0to59"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa kwenda nje ya kituo (referral out)KE Miaka 10 ? 14",
    //     "id": "wuWc1QqiwvR",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "10to14"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa kwenda nje ya kituo (referral out)KE Miaka 15 ? 19",
    //     "id": "bZzakCYN5jy",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa kwenda nje ya kituo (referral out)KE Miaka 20 ? 24",
    //     "id": "LkoZIUlJ6AW",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "20to24"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa kwenda nje ya kituo (referral out)KE Miaka 25 na Zaidi",
    //     "id": "AGTSusxWfP6",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "25above"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa kwenda nje ya kituo (referral out)KE Miaka 5 ? 9",
    //     "id": "d17nfNI2coN",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa kwenda nje ya kituo (referral out)KE Miezi 0 ? 59",
    //     "id": "tEpe4i4l22J",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "0to59"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa kwenda nje ya kituo (referral out) ME Miaka 10 ? 14",
    //     "id": "aeEwVgwePRj",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "10to14"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa kwenda nje ya kituo (referral out) ME Miaka 15 ? 19",
    //     "id": "pJQAFHkHTrq",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa kwenda nje ya kituo (referral out) ME Miaka 20 ? 24",
    //     "id": "FrxVAXHK0TY",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "20to24"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa kwenda nje ya kituo (referral out) ME Miaka 25 na Zaidi",
    //     "id": "nRqV91nF9gG",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "25above"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa kwenda nje ya kituo (referral out) ME Miaka 5 ? 9",
    //     "id": "WJJC1wGqupJ",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa kwenda nje ya kituo (referral out) ME Miezi 0 ? 59",
    //     "id": "qDU3LhnJqB4",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "0to59"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa ndani ya kituo (Internal referral) KE Miaka 10 ? 14",
    //     "id": "Hi7vFb1zQaF",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "10to14"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa ndani ya kituo (Internal referral) KE Miaka 15 ? 19",
    //     "id": "MCQg6PsMdbw",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa ndani ya kituo (Internal referral) KE Miaka 20 ? 24",
    //     "id": "NtNxUjNlphs",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "20to24"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa ndani ya kituo (Internal referral) KE Miaka 25 na Zaidi",
    //     "id": "B6PA97gfEqi",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "25above"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa ndani ya kituo (Internal referral) KE Miaka 5 ? 9",
    //     "id": "dW3aizxcksu",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa ndani ya kituo (Internal referral) KE Miezi 0 ? 59",
    //     "id": "PT36LFbcwJ9",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "0to59"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa ndani ya kituo (Internal referral) ME Miaka 10 ? 14",
    //     "id": "ZRqhH1l82fs",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "10to14"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa ndani ya kituo (Internal referral) ME Miaka 15 ? 19",
    //     "id": "UCkEPsSenAN",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa ndani ya kituo (Internal referral) ME Miaka 20 ? 24",
    //     "id": "K3IwUjtKk0F",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "20to24"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa ndani ya kituo (Internal referral) ME Miaka 25 na Zaidi",
    //     "id": "TZSEjkOPwc1",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "25above"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa ndani ya kituo (Internal referral) ME Miaka 5 ? 9",
    //     "id": "Xz6RMoSSjoE",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Wateja waliopata rufaa ndani ya kituo (Internal referral) ME Miezi 0 ? 59",
    //     "id": "iLdHxNG60Y7",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "0to59"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wazazi/walezi walioulizwa maswali ya utambuzi kwa niaba ya watoto (Screening) KE  Miaka 10 ? 14",
    //     "id": "AeF79q3PGbr",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "10to14"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wazazi/walezi walioulizwa maswali ya utambuzi kwa niaba ya watoto (Screening) KE  Miaka 15 ? 19",
    //     "id": "Z1vSBUvepq1",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       ""
    //     ]
    //   },
    //   {
    //     "name": "GBV Wazazi/walezi walioulizwa maswali ya utambuzi kwa niaba ya watoto (Screening) KE  Miaka 20 ? 24",
    //     "id": "QQH9jljHZcf",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "20to24"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wazazi/walezi walioulizwa maswali ya utambuzi kwa niaba ya watoto (Screening) KE  Miaka 25 na Zaidi",
    //     "id": "s4W4UOsyyqV",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "25above"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wazazi/walezi walioulizwa maswali ya utambuzi kwa niaba ya watoto (Screening) KE  Miaka 5 ? 9",
    //     "id": "xHkFbZUT8GM",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "5to9"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wazazi/walezi walioulizwa maswali ya utambuzi kwa niaba ya watoto (Screening) KE  Miezi 0 ? 59",
    //     "id": "J2Yij0v10R6",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "0to59"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wazazi/walezi walioulizwa maswali ya utambuzi kwa niaba ya watoto (Screening) ME  Miaka 10 ? 14",
    //     "id": "ioOvhh2B2sT",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "10to14"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wazazi/walezi walioulizwa maswali ya utambuzi kwa niaba ya watoto (Screening) ME  Miaka 15 ? 19",
    //     "id": "BIz45ixiDSb",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "15to19"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wazazi/walezi walioulizwa maswali ya utambuzi kwa niaba ya watoto (Screening) ME  Miaka 20 ? 24",
    //     "id": "sRUGs5JCyDM",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "20to24"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wazazi/walezi walioulizwa maswali ya utambuzi kwa niaba ya watoto (Screening) ME  Miaka 25 na Zaidi",
    //     "id": "MDHNe0CdM2H",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "25above"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wazazi/walezi walioulizwa maswali ya utambuzi kwa niaba ya watoto (Screening) ME  Miaka 5 ? 9",
    //     "id": "zthvLgB0sam",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "5to9"
    //     ]
    //   },
    //   {
    //     "name": "GBV Wazazi/walezi walioulizwa maswali ya utambuzi kwa niaba ya watoto (Screening) ME  Miezi 0 ? 59",
    //     "id": "RZ1AdkI4s7j",
    //     "categories": [
    //       "ageGBV"
    //     ],
    //     "categoriesItems": [
    //       "0to59"
    //     ]
    //   }
    // ]
    // }
    //
    // this.http.putDHIS('dataStore/Reporting/Entry_forms', forms).subscribe((dataStoreResponse) => {
    //   console.log(dataStoreResponse);
    // }, error => {
    //   console.log(error);
    // });
  }


  private getSystemDHISUid() {
    return this.http.getDHIS(`system/uid.json?limit=1`);
  }

  createDataSet(entry: { dataSet: any, entryForms: any }): Observable<any> {
    console.log(entry.dataSet);
    this._prepareEntryForms(entry.dataSet, entry.entryForms);
    return Observable.create((observ) => {
      this.getSystemDHISUid().subscribe((system: any) => {
        entry.dataSet.datasetId = system.codes[0];
        this.http.postDHIS('metadata', this._prepareDataSet(entry.dataSet)).subscribe((response) => {
          this.http.putDHIS('dataStore/Reporting/Entry_forms', this._prepareEntryForms(entry.dataSet, entry.entryForms)).subscribe((dataStoreResponse) => {
            observ.next(response);
            observ.complete();
          }, error => {
            observ.error(error);
          });
        }, error => {
          observ.error(error);
        });
      });

    });
  }

  deleteDataSet(entry): Observable<any> {
    return Observable.create((observ) => {

      entry.dataStore.forms.splice(_.findIndex(entry.dataStore.forms, (entryForm: any) => {
          return entry.form.datasetId === entryForm.id;
        }));
        this.http.deleteDHIS('dataSets/' + entry.dataSet.datasetId).subscribe((response) => {
          this.http.putDHIS('dataStore/Reporting/Entry_forms', entry.dataStore.forms).subscribe((dataStoreResponse) => {
            observ.next(response);
            observ.complete();
          }, error => {
            observ.error(error);
          });
        }, error => {
          observ.error(error);
        });



    });
  }

  _prepareEntryForms(newEntryForm, entryForms) {

    const formSections = [];
    newEntryForm.sections.forEach((section) => {
      const sectionItems = [];
      section.items.forEach(item => {
        sectionItems.push(
          {
            id: this.generateCode(),
            name: item.name,
            dataElements: [item.id]
          }
        );
      });

      console.log(sectionItems);
      const categories = [];
      section.categories.forEach((category) => {
        categories.push(category.id);
      });

      formSections.push(
        {
          categories: categories,
          id: section.id,
          name: section.name,
          items: sectionItems
        }
      );
      console.log(formSections);
    });

    entryForms.forms.push(
      {
        name: newEntryForm.name,
        id: newEntryForm.id,
        datasetId: newEntryForm.datasetId,
        periodType: newEntryForm.periodType,
        sections: formSections
      }
    );
    console.log(entryForms);
    return entryForms;
  }

  sample = (d = [], fn = Math.random) => {
    if (d.length === 0) return;
    return d[Math.round(fn() * (d.length - 1))];
  }

  generateCode = (limit = 11, fn = Math.random) => {
    const allowedLetters: any = ['abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].join('');
    const allowedChars: any = ['0123456789', allowedLetters].join('');

    const arr = [this.sample(allowedLetters, fn)];

    for (let i = 0; i < limit - 1; i++) {
      arr.push(this.sample(allowedChars, fn));
    }

    return arr.join('');
  }

  private _prepareDataSet(dataSet: any) {
    let dataSetElements = [];
    dataSet.sections.forEach((section) => {
      section.items.forEach((item) => {
        dataSetElements = [
          ...dataSetElements,
          {
            id: this.generateCode(),
            dataSet: {id: dataSet.datasetId},
            categoryCombo: {},
            dataElement: {id: item.id}
          }
        ];
      });

    });
    let orgUnits = [];
    dataSet.selectedOrgUnits.forEach((orgUnit) => {
      orgUnits = [...orgUnits, {id: orgUnit.id}];
    });

    return {
      dataSets: [{
        dataSetElements: dataSetElements,
        expiryDays: 0,
        id: dataSet.datasetId,
        indicators: [],
        legendSets: [],
        name: dataSet.name,
        openFuturePeriods: 0,
        organisationUnits: orgUnits,
        periodType: dataSet.periodType,
        timelyDays: 15
      }]
    };
  }


}
