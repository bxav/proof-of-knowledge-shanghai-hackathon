<?php

namespace App\Validator\Constraints;

use App\Entity\Assessment;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use JsonSchema\Validator as JsonSchemaValidator;

class AssessmentSchemaValidator extends ConstraintValidator
{
    public function validate($assessment, Constraint $constraint)
    {
        /** @var Assessment $assessment */

        $config = (object)$assessment->getData();

        $validator = new JsonSchemaValidator;
        $validator->validate($config, (object)$assessment->getAssessmentTemplate()->getTemplate());

        if (!$validator->isValid()) {
            foreach ($validator->getErrors() as $error) {
                $this->context->buildViolation($constraint->message)
                    ->setParameter('{{ string }}', sprintf("[%s] %s", $error['property'], $error['message']))
                    ->addViolation();
            }

        }

        if (array_diff((array) $config, $assessment->getAssessmentTemplate()->getAnswers())) {
            $this->context->buildViolation($constraint->message)
                ->setParameter('{{ string }}', 'Failure!')
                ->addViolation();
        }
    }
}