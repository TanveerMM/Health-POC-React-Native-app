//
//  StepCounter.swift
//  StepsCounter
//
//  Created by Apple on 14/08/23.
//

import Foundation
import UIKit
import HealthKit


@objc(StepCounter)
class StepCounter: NSObject {
  
  private var intensityValue = 0
  private var healthStore: HealthStore?
  /*@State*/ private var steps: [Step] = [Step]()
  
  override init() {
      healthStore = HealthStore()
  }
  
  
  @objc
  func getStepCounter(_ callback: RCTResponseSenderBlock) {
    if let healthStore = healthStore {
        healthStore.requestAuthorization { success in
            if success {
                healthStore.calculateSteps { statisticsCollection in
                    if let statisticsCollection = statisticsCollection {
                        // update the UI
                      self.updateUIFromStatistics(statisticsCollection)
                    }
                }
            }
        }
    }
    //callback([self.intensityValue])
    callback([self.steps])
  }
  
  private func updateUIFromStatistics(_ statisticsCollection: HKStatisticsCollection) {
  
      let startDate = Calendar.current.date(byAdding: .day, value: -7, to: Date())!
      let endDate = Date()
      
      statisticsCollection.enumerateStatistics(from: startDate, to: endDate) { statistics, stop in
          
          let count = statistics.sumQuantity()?.doubleValue(for: .count())
          
          let step = Step(count: Int(count ?? 0), date: statistics.startDate)
        print("step from Xcode: \(self.steps.append(step))")
          self.steps.append(step)
      }
  }
  
  @objc
    static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
}
