<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;

/**
 * @ORM\Entity
 * @ApiResource()
 */
class AssessmentTemplate
{
    /**
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(type="string", nullable=false)
     * @ApiProperty()
     */
    private $name = "";

    /**
     * @var array
     *
     * @ORM\Column(type="json", nullable=true)
     * @ApiProperty()
     */
    private $template = [];

    public function __construct()
    {
        $this->id = Uuid::uuid4();
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getTemplate(): array
    {
        return $this->template;
    }

    public function setTemplate(array $template): void
    {
        $this->template = $template;
    }
}
