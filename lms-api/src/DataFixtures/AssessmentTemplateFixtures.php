<?php
namespace App\DataFixtures;

use App\Entity\AssessmentTemplate;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Ramsey\Uuid\Uuid;

class AssessmentTemplateFixtures extends Fixture
{
    const DEFAULT_TEST_UUID = '2dc8d9f4-9f30-45ea-bc35-0ff1d316d703';

    const NB_TEMPLATES = 10;

    private $faker;

    public function __construct()
    {
        $this->faker = \Faker\Factory::create();
    }

    public function load(ObjectManager $manager)
    {


        $template = new AssessmentTemplate(Uuid::fromString(self::DEFAULT_TEST_UUID));

        $template->setName('Swimming Pool basic security');
        $template->setTemplate(json_decode(<<<JSON
{
    "properties": {
      "question1": {
        "type": "boolean",
        "description": "Do you know the basic swimming pool security stuff?"
      }
    },
    "required": ["question1"]
  }
JSON
            , true));

        $manager->persist($template);

        $template = new AssessmentTemplate();

        $template->setName('Swimming Pool Advanced security');
        $template->setTemplate(json_decode(<<<JSON
{
    "properties": {
      "question1": {
        "type": "boolean",
        "description": "Did you read the rules?"
      },
      "question2": {
        "type": "string",
        "description": "Give me the color of the background?"
      },
      "question3": {
        "type": "boolean",
        "description": "Do you understand the rules?"
      }
    },
    "required": ["question1", "question2", "question3"]
  }
JSON
            , true));

        $manager->persist($template);

        $template = new AssessmentTemplate();

        $template->setName('Autonomous taxi usage');
        $template->setTemplate(json_decode(<<<JSON
{
    "properties": {
      "question1": {
        "type": "string",
        "description": "Do you need a licence to use the autonomous taxi?"
      }
    },
    "required": ["question1"]
  }
JSON
            , true));

        $manager->persist($template);

        $template = new AssessmentTemplate();

        $template->setName('cinema room (Building D)');
        $template->setTemplate(json_decode(<<<JSON
{
    "properties": {
      "question1": {
        "type": "boolean",
        "description": "Are you clean?"
      }
    },
    "required": ["question1"]
  }
JSON
            , true));

        $manager->persist($template);

        $manager->flush();
    }
}