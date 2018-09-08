<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;

/**
 * @ORM\Entity
 * @ApiResource()
 *
 * @ApiFilter(SearchFilter::class, properties={"assessmentTemplate": "exact", "authorKey": "exact"})
 */
class Assessment
{
    /**
     * @var string
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $id;

    /**
     * @var AssessmentTemplate
     *
     * @ORM\ManyToOne(targetEntity="AssessmentTemplate")
     * @ORM\JoinColumn(nullable=true)
     */
    private $assessmentTemplate;

    /**
     * @var string
     *
     * @ORM\Column(type="string", nullable=false)
     * @ApiProperty()
     */
    private $authorKey = "";

    /**
     * @var array
     *
     * @ORM\Column(type="json")
     * @ApiProperty()
     */
    private $data = [];

    public function __construct()
    {
        $this->id = Uuid::uuid4();
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getAssessmentTemplate(): AssessmentTemplate
    {
        return $this->assessmentTemplate;
    }

    public function setAssessmentTemplate(AssessmentTemplate $assessmentTemplate): void
    {
        $this->assessmentTemplate = $assessmentTemplate;
    }

    public function getData(): array
    {
        return $this->data;
    }

    public function setData(array $data): void
    {
        $this->data = $data;
    }

    public function getAuthorKey(): string
    {
        return $this->authorKey;
    }

    public function setAuthorKey(string $authorKey): void
    {
        $this->authorKey = $authorKey;
    }
}
