import { BaseController } from "../abstract/BaseController"
import { Mark } from "../models/Mark"

export class MarkController extends BaseController<Mark> {
  public create(m: Mark): boolean {
    return true
  }
  public index(){
    return Mark.all 
  }
  public show(){}
  public update(){} 
}

export default {
    MarkController
}