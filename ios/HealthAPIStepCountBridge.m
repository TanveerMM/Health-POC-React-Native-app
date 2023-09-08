//
//  HealthAPIStepCountBridge.m
//  StepsCounter
//
//  Created by Apple on 14/08/23.
//

#import <Foundation/Foundation.h>
#import <HealthKit/HealthKit.h>

#import "React/RCTBridgeModule.h"


@interface RCT_EXTERN_MODULE(StepCounter, NSObject)

RCT_EXTERN_METHOD(getStepCounter: (RCTResponseSenderBlock)callback)

@end
