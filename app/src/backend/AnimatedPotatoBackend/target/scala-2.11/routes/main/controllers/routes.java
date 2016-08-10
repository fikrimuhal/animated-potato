
// @GENERATOR:play-routes-compiler
// @SOURCE:/home/who/IdeaProjects/animated-potato/AnimatedPotatoBackend/conf/routes
// @DATE:Tue Aug 09 13:47:09 EEST 2016

package controllers;

import router.RoutesPrefix;

public class routes {
  
  public static final controllers.ReverseAssets Assets = new controllers.ReverseAssets(RoutesPrefix.byNamePrefix());
  public static final controllers.ReverseCategoryController CategoryController = new controllers.ReverseCategoryController(RoutesPrefix.byNamePrefix());
  public static final controllers.ReverseQuestionOptionController QuestionOptionController = new controllers.ReverseQuestionOptionController(RoutesPrefix.byNamePrefix());
  public static final controllers.ReverseQuestionController QuestionController = new controllers.ReverseQuestionController(RoutesPrefix.byNamePrefix());
  public static final controllers.ReverseParticipantController ParticipantController = new controllers.ReverseParticipantController(RoutesPrefix.byNamePrefix());

  public static class javascript {
    
    public static final controllers.javascript.ReverseAssets Assets = new controllers.javascript.ReverseAssets(RoutesPrefix.byNamePrefix());
    public static final controllers.javascript.ReverseCategoryController CategoryController = new controllers.javascript.ReverseCategoryController(RoutesPrefix.byNamePrefix());
    public static final controllers.javascript.ReverseQuestionOptionController QuestionOptionController = new controllers.javascript.ReverseQuestionOptionController(RoutesPrefix.byNamePrefix());
    public static final controllers.javascript.ReverseQuestionController QuestionController = new controllers.javascript.ReverseQuestionController(RoutesPrefix.byNamePrefix());
    public static final controllers.javascript.ReverseParticipantController ParticipantController = new controllers.javascript.ReverseParticipantController(RoutesPrefix.byNamePrefix());
  }

}
