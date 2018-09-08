<?php

namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class AssessmentSchema extends Constraint
{
    public $message = '{{ string }}';

    public function getTargets()
    {
        return Constraint::CLASS_CONSTRAINT;
    }
}