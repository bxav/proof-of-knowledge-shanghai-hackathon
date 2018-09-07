<?php
namespace App\DataFixtures;

use App\Entity\AssessmentTemplate;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class AssessmentTemplateFixtures extends Fixture
{
    const NB_TEMPLATES = 10;

    private $faker;

    public function __construct()
    {
        $this->faker = \Faker\Factory::create();
    }

    public function load(ObjectManager $manager)
    {
        for ($i=0; $i < self::NB_TEMPLATES; $i++) {

            $template = new AssessmentTemplate();

            $template->setName($this->faker->streetName);
            $template->setTemplate(json_decode(<<<JSON
{
    "properties": {
      "firstname": {
        "type": "string",
        "description": "Firstname"
      }
    },
    "required": ["firstname"]
  }
JSON
, true));

            $manager->persist($template);

            $this->addReference("template-$i", $template);
        }

        $manager->flush();
    }
}