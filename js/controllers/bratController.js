app.controller('bratController', function($scope, $log, $rootScope, $firebaseObject) {
  
    // TODO: Retrieve this value from Firebase.
  $rootScope.numDocuments = 3;
  
  // Index of document (in document data) to display.
  $rootScope.docIndex = parseInt(getQueryVariable("doc") || "0");
  
  // TODO: Make constants for URL's here.
  var collDataRef = new Firebase('https://blazing-heat-6025.firebaseio.com/collData');
  var docDataRef = new Firebase('https://blazing-heat-6025.firebaseio.com/docData/'+ $rootScope.docIndex);

  var collDataObjRef = $firebaseObject(collDataRef)
  collDataObjRef.$bindTo($rootScope, 'collData');
  var docDataObjRef = $firebaseObject(docDataRef);
  docDataObjRef.$bindTo($rootScope, 'docData');
  
  // Resets the collection data. For debugging.
  // var resetCollData = function() {
  //   $rootScope.collData.entity_types = [
	 //   {
		// 		"type": "ALIAS",
		// 		"labels" : ["ALIAS", "AL"],
		// 		"bgColor": "red",
		// 		"borderColor": "darken"
		// 	},
		// 	{
  //   		"type": "NON-CHARACTER",
  //   		"labels": ["NON-CHARACTER", "NON"],
  //   		"bgColor": "#BBBBBB",
  //   		"borderColor": "darken"
  //   	},
  //   	{
  //   		"type": "UNRESOLVED",
  //   		"labels" : ["UNRESOLVED"],
  //   		"bgColor": "#39FF14",
  //   		"borderColor": "darken"
  //   	}
	 // ]
	 // collDataObjRef.$save();
  // };

  // Resets the document data. For debugging.
  // var resetDocData = function() {
  //   $rootScope.docData.entities = [
  //     [
  //   	  "T1", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     296, 
  //                     298
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T2", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     343, 
  //                     346
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T3", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     350, 
  //                     355
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T4", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     416, 
  //                     419
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T6", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     435, 
  //                     438
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T7", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     509, 
  //                     511
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T9", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     544, 
  //                     547
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T10", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     588, 
  //                     591
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T11", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     597, 
  //                     599
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T13", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     648, 
  //                     651
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T16", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     718, 
  //                     721
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T17", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     735, 
  //                     737
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T18", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     743, 
  //                     744
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T20", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     824, 
  //                     827
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T21", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     944, 
  //                     946
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T23", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1046, 
  //                     1048
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T24", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1090, 
  //                     1092
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T25", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1246, 
  //                     1248
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T27", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1427, 
  //                     1431
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T28", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1484, 
  //                     1487
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T29", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1504, 
  //                     1507
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T30", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1523, 
  //                     1524
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T31", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1553, 
  //                     1556
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T32", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1560, 
  //                     1564
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T33", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1635, 
  //                     1638
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T35", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1675, 
  //                     1677
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T36", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1700, 
  //                     1703
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T37", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1707, 
  //                     1711
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T38", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1727, 
  //                     1730
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T39", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1742, 
  //                     1745
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T40", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1757, 
  //                     1759
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T41", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1770, 
  //                     1771
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T42", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1798, 
  //                     1801
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T43", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1827, 
  //                     1830
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T44", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1840, 
  //                     1844
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T45", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1848, 
  //                     1858
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T46", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1903, 
  //                     1906
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T47", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1926, 
  //                     1929
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T48", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1933, 
  //                     1937
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T49", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1960, 
  //                     1963
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T50", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1999, 
  //                     2002
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T51", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2011, 
  //                     2013
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T52", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2015, 
  //                     2016
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T53", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2060, 
  //                     2061
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T54", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2153, 
  //                     2156
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T56", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2286, 
  //                     2289
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T57", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2330, 
  //                     2332
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T59", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2382, 
  //                     2383
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T60", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2396, 
  //                     2397
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T61", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2405, 
  //                     2408
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T63", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2491, 
  //                     2494
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T64", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2498, 
  //                     2502
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T65", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2593, 
  //                     2596
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T66", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2603, 
  //                     2607
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T67", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2635, 
  //                     2638
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T69", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2678, 
  //                     2680
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T70", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2690, 
  //                     2693
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T71", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2697, 
  //                     2700
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T72", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2712, 
  //                     2715
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T73", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2745, 
  //                     2746
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T74", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2793, 
  //                     2796
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T75", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2802, 
  //                     2803
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T76", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2829, 
  //                     2832
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T77", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2843, 
  //                     2846
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T78", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2894, 
  //                     2896
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T79", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2926, 
  //                     2927
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T80", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2978, 
  //                     2979
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T81", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2987, 
  //                     2990
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T82", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3049, 
  //                     3055
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T83", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3061, 
  //                     3062
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T84", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3071, 
  //                     3074
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T85", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3148, 
  //                     3151
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T86", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3170, 
  //                     3173
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T87", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3193, 
  //                     3197
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T88", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3211, 
  //                     3215
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T89", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3234, 
  //                     3238
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T90", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3249, 
  //                     3251
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T91", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3254, 
  //                     3258
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T94", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3387, 
  //                     3390
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T95", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3430, 
  //                     3433
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T96", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3457, 
  //                     3459
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T97", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3461, 
  //                     3464
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T98", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3507, 
  //                     3510
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T99", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3519, 
  //                     3521
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T100", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3532, 
  //                     3533
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T101", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3571, 
  //                     3575
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T102", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3596, 
  //                     3597
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T103", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3609, 
  //                     3612
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T104", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3621, 
  //                     3625
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T105", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3686, 
  //                     3689
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T106", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3707, 
  //                     3708
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T107", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3724, 
  //                     3725
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T108", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3731, 
  //                     3734
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T111", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3861, 
  //                     3863
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T112", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3899, 
  //                     3902
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T113", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3918, 
  //                     3922
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T115", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3980, 
  //                     3981
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T116", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3993, 
  //                     3997
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T117", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     53, 
  //                     57
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T118", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     111, 
  //                     116
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T119", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     171, 
  //                     174
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T120", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     281, 
  //                     289
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T121", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     365, 
  //                     374
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T122", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     386, 
  //                     396
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T123", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     408, 
  //                     412
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T5", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     485, 
  //                     495
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T8", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     554, 
  //                     563
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T12", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     616, 
  //                     626
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T14", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     839, 
  //                     848
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T15", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     891, 
  //                     894
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T19", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1061, 
  //                     1071
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T22", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1122, 
  //                     1132
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T124", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1150, 
  //                     1158
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T125", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1231, 
  //                     1238
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T126", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1286, 
  //                     1290
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T127", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1313, 
  //                     1316
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T128", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1391, 
  //                     1396
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T26", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1444, 
  //                     1454
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T129", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1469, 
  //                     1473
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T34", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1939, 
  //                     1950
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T130", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1980, 
  //                     1985
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T131", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     1993, 
  //                     1997
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T132", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2118, 
  //                     2123
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T133", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2142, 
  //                     2151
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T55", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2224, 
  //                     2229
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T134", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2280, 
  //                     2284
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T135", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2313, 
  //                     2324
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T58", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2431, 
  //                     2440
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T62", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2504, 
  //                     2515
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T136", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2520, 
  //                     2530
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T68", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2756, 
  //                     2767
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T137", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     2968, 
  //                     2973
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T138", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3014, 
  //                     3019
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T139", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3102, 
  //                     3106
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T140", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3137, 
  //                     3142
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T92", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3297, 
  //                     3302
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T141", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3308, 
  //                     3313
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T93", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3355, 
  //                     3362
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T142", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3367, 
  //                     3377
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T143", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3526, 
  //                     3530
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T109", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3875, 
  //                     3879
  //                 ]
  //             ]
  //         ], 
  //         [
  //             "T110", 
  //             "ALIAS", 
  //             [
  //                 [
  //                     3946, 
  //                     3950
  //                 ]
  //             ]
  //         ]
  //   ];
  //   docDataObjRef.$save();
  // };
  
  $scope.findVisual = function() {
    $.find('rect').forEach(function(srcElement) {
      if (srcElement.attributes && srcElement.attributes.class && srcElement.attributes.class.nodeValue.indexOf("span") > -1) {
        for (attribute in srcElement.attributes) {
          if (srcElement.attributes[attribute].nodeName == 'data-span-id') {
            id = srcElement.attributes[attribute].value
            if ($rootScope.entity[0] == id) {
              srcElement.style.strokeWidth = "5";
              $rootScope.visualElement = srcElement;
            }
          }
        }
      }
    });
  }

  collDataObjRef.$loaded(
    function(collData) {
      // resetCollData();
      docDataObjRef.$loaded(function(docData) {
          // resetDocData();

          head.ready(function() {
            var liveDiv = $('#brat-view');

            // Hook into the dispatcher.
            var liveDispatcher = Util.embed('brat-view',
              $.extend({
                'collection': null
              }, collData),
              $.extend({}, docData), webFontURLs);

            var renderError = function() {
              // liveDiv.css({'border': '2px solid red'}); // Setting this blows the layout.
            };

            liveDispatcher.on('renderError: Fatal', renderError);
            liveDispatcher.on('doneRendering', $scope.findVisual);

            $rootScope.entity = getFirstEntity();
            $rootScope.span = getSpan($rootScope.entity);
            $rootScope.items = $rootScope.collData.entity_types;
            $rootScope.tagOrdering = $rootScope.items.map(function (tag) { return tag.type; });
            $rootScope.visualElement = $scope.findVisual;
            $rootScope.aliasesRemaining = $rootScope.docData.entities.filter(function(e) {
                return e[1] == 'ALIAS';
              }).length;

            docDataObjRef.$watch(function() {
              $rootScope.aliasesRemaining = $rootScope.docData.entities.filter(function(e) {
                return e[1] == 'ALIAS';
              }).length;
            });

            collDataObjRef.$watch(function() {
              liveDispatcher.post('collectionLoaded', [$.extend({
                'collection': null
              }, $rootScope.collData)]);
            });

            docDataObjRef.$watch(function() {
              liveDispatcher.post('requestRenderData', [$.extend({}, $rootScope.docData)]);
            });
          })
        },
        function(error) {
          console.error("Error:", error);
        })
    },
    function(error) {
      console.error("Error:", error);
    }
  );

  var getFirstEntity = function() {
    return $rootScope.docData.entities.reduce(function(p, v) {
      return ((p[2][0][0] < v[2][0][0]) ? p : v);
    });
  };

  // TODO: Make this accessible in other parts of the code.
  var getSpan = function(entity) {
    return $rootScope.docData.text.substring(entity[2][0][0], entity[2][0][1]);
  };

  var unselect = function() {
    if ($rootScope.visualElement != '') {
      $rootScope.visualElement.style.strokeWidth = "";
    }
    $rootScope.visualElement = '';
    $rootScope.entity = '';
    $rootScope.span ='';
  }

  $rootScope.select = function(e) {
    unselect();
    if (e.srcElement.nodeName == 'rect' && e.srcElement.attributes.class.nodeValue.indexOf("span") > -1) {
      for (attribute in e.srcElement.attributes) {
        if (e.srcElement.attributes[attribute].nodeName == 'data-span-id') {
          $rootScope.visualElement = e.srcElement;
          id = e.srcElement.attributes[attribute].value
          $rootScope.docData['entities'].forEach(function(entity) {
            if (entity[0] == id) {

              $rootScope.items.forEach(function(item) {
                if (item.type == entity[1]) {
                  $rootScope.entity = entity;
                  $rootScope.span = getSpan(entity);
                }
              });
              e.srcElement.style.strokeWidth = "5";
            }
          });
        }
      }
    }
    else {
      return;
    }
  };
  
});

app.filter('tagOrderFilter', function ($rootScope) {
  return function (tags) {
    if ($rootScope.tagOrdering) {
      var untrackedTags = tags.filter(function (t) { return $rootScope.tagOrdering.indexOf(t.type) == -1; });
      var orderedTrackedTags = $rootScope.tagOrdering.map(function (type) {
        return tags.filter(function (t) { return t.type == type; })[0];
      });
      return orderedTrackedTags.concat(untrackedTags);
    } else {
      return tags;
    }
  };
});