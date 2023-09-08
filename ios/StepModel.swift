//
//  StepModel.swift
//  StepsCounter
//
//  Created by Apple on 16/08/23.
//

struct Step: Identifiable {
    let id = UUID()
    let count: Int
    let date: Date
}
